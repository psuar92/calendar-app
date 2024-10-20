import { translations } from '../../helpers';
import { useAuthStore } from '../../hooks';

export const Navbar = ({changeLang, lang}) => {

    const onChangeLang = () => {
        changeLang(lang === 'enUS' ? 'es' : 'enUS');
    }

    const locale = translations[lang];

    const { startLogout, user } = useAuthStore();
    
    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp;
                    {user.name}
            </span>

            <button className='btn btn-outline-info' onClick={onChangeLang}>
                <i className='fa-solid fa-globe'></i>
                &nbsp;
                EN/ES
            </button>

            <button className='btn btn-outline-danger' onClick={startLogout}>
                <i className='fas fa-sign-out-alt'></i>
                &nbsp;
                <span>{locale.logout}</span>
            </button>
        </div>
    );
}