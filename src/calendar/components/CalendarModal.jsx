import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useModal } from '../hooks';
import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import { translations } from '../../helpers';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = ({ lang }) => {
    
    const { isDateModalOpen, closeDateModal } = useUiStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
      if(activeEvent !== null) {
        setFormValues({...activeEvent});
      }
    }, [activeEvent])
    

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    };

    const locale = translations[lang];

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start)
        
        if(isNaN(difference) || difference <= 0) {
            Swal.fire(locale.incorrectDates, locale.checkEnteredDates, 'error');
            return;
        }

        if(formValues.title.length <= 0) return;

        console.log(formValues);

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-bg'
            closeTimeoutMS={200}
        >
            <h1> {locale.newEvent}</h1>
            <hr />
            <form className='container' onSubmit={onSubmit}>

                <div className='form-group mb-2'>
                    <label> {locale.dateAndStartTime}</label>
                    <DatePicker
                        locale={(lang === 'es') ? 'es' : ''}
                        wrapperClassName='form-control'
                        selected={formValues.start}
                        className='form-control'
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption={locale.time}
                    />
                </div>

                <div className='form-group mb-2'>
                    <label> {locale.dateAndEndTime} </label>
                    <DatePicker
                        locale={(lang === 'es') ? 'es' : ''}
                        wrapperClassName='form-control'
                        minDate={formValues.start}
                        selected={formValues.end}
                        className='form-control'
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        timeCaption={locale.time}
                    />
                </div>

                <hr />
                <div className='form-group mb-2'>
                    <label>{locale.titleAndNotes}</label>
                    <input
                        type='text'
                        className={`form-control ${titleClass}`}
                        placeholder={locale.eventTitle}
                        name='title'
                        autoComplete='off'
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id='emailHelp' className='form-text text-muted'>{locale.aShortDescription}</small>
                </div>

                <div className='form-group mb-2'>
                    <textarea
                        type='text'
                        className='form-control'
                        placeholder={locale.notes}
                        rows='5'
                        name='notes'
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id='emailHelp' className='form-text text-muted'>{locale.additionalInfo}</small>
                </div>

                <button
                    type='submit'
                    className='btn btn-outline-primary'
                >
                    <i className='far fa-save'></i>
                    <span> {locale.save}</span>
                </button>

            </form>
        </Modal>
    );
}