import React from 'react';
import './Register.css';

const Register = (props) => {
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
                <h2 className={'popup__title'}>Регистрация</h2>
                <>
                    <>
                        <div className="input__box">
                            <span className='input__type'>Email</span>
                            <input
                                type='email'
                                placeholder='Введите почту'
                                required
                                className="popup__input"
                            />
                        </div>
                        <div className="input__box">
                            <span className='input__type'>Пароль</span>
                            <input
                                type='password'
                                minLength='8'
                                placeholder='Введите пароль'
                                required
                                className="popup__input"
                            />
                        </div>
                        <div className="input__box">
                            <span className='input__type'>Имя</span>
                            <input
                                type='text'
                                placeholder='Введите свое имя'
                                required
                                className="popup__input"
                            />
                        </div>
                    </>
                    <button
                        type="submit"
                        className='popup__button'
                    >
                        Зарегистрироваться
          </button>
                </>
                <span className='popup__another-login'>Или
          <span onClick={handleLink} className='popup__link'> Войти</span>
                </span>
            </form>
        </div >
    );
};

export default Register;