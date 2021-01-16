import React from 'react';
import './PopupWithForm.css';

const PopupWithForm = (props) => {
    const { name, isOpen, title, children, onClose, onChange, onSubmit, disabled, submitButtonText, isFormValid } = props;
    return (
        <section
            className={`popup popup_${name} ${isOpen ? '' : 'popup_hidden'}`}>
            <form onSubmit={onSubmit} name={name} className={'popup__container popup__container_login'} >
                {children}
                <button onClick={onClose} className={'popup__close popup__close_login'} type='button' />
                <h2 className={'popup__title'}>{title}</h2>
                {name !== 'tooltip' &&
                    <>
                        <button
                            className={`popup__button ${disabled && 'popup__button_active'}`}
                            onClick={onSubmit}
                            disabled={!isFormValid}>
                            {submitButtonText}
                        </button>
                    </>
                }
                <span className='popup__subtitle'>{name !== 'tooltip' && 'или '}
                    <span className='popup__link' onClick={onChange}>
                        {name === 'login' ? 'Зарегистрироваться' : 'Войти'}</span></span>
            </form>
        </section >
    );
};

export default PopupWithForm;