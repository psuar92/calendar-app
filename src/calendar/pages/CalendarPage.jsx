import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers/';
import { useEffect, useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    
    const { events, setActiveEvent } = useCalendarStore();

    const [lang, setLang] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return storedLang || 'enUS';
    });

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '3px',
            opacity: 0.8,
            color: 'white',
        };

        return {
            style
        };
    };

    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    return (
        <>
            <Navbar changeLang={setLang} lang={lang} />

            <Calendar
                culture={(lang === 'enUS') ? 'enUS' : 'es'}
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 'calc(100vh - 80px)' }}
                messages={(lang === 'enUS') ? '' : getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal lang={lang}/>

            <FabAddNew />
            <FabDelete />
        </>
    );
}