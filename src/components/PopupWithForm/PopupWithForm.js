import React from 'react';
import './PopupWithForm.css';

const PopupWithForm = (props) => {
    const { isPopupOpen, toggleForm, setIsLoginOpen } = props;

    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPopupOpen) {
                toggleForm();
            }
        });
    }, [toggleForm, isPopupOpen]);

    function handleClose(e) {
        if (e.target.classList.contains('popup')) {
            toggleForm();
        }
    }

    const handleLink = () => {
        setIsLoginOpen(true);
        toggleForm();
    };

    return (
        <div onClick={handleClose}
            className={`popup popup_login ${isPopupOpen ? '' : 'popup_hidden'}`}>
            <form className={'popup__container popup__container_login'} >
                <button onClick={toggleForm} className={'popup__close popup__close_login'} type='button' />
                <h2 className={'popup__title'}>Пользователь успешно зарегистрирован!</h2>
                <span onClick={handleLink} className='popup__link'>Войти</span>
            </form>

        </div >
    );
};

export default PopupWithForm;