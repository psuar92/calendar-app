export const Navbar = ({changeLang, lang}) => {

    const onChangeLang = () => {
        changeLang(lang === 'enUS' ? 'es' : 'enUS');
    }
    
    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp;
                    Pedro
            </span>

            <button className='btn btn-outline-info' onClick={onChangeLang}>
                <i className='fa-solid fa-globe'></i>
                &nbsp;
                EN/ES
            </button>

            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt'></i>
                &nbsp;
                <span>Logout</span>
            </button>
        </div>
    );
}