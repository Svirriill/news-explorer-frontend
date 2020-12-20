import React from 'react';
import './Login.css';

const Login = (props) => {
  const { isPopupOpen, toggleForm, setIsRegisterOpen } = props;

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
    setIsRegisterOpen(true);
    toggleForm();
  };

  return (
    <div onClick={handleClose}
      className={`popup popup_login ${isPopupOpen ? '' : 'popup_hidden'}`}>
      <form className={'popup__container popup__container_login'} >
        <button onClick={toggleForm} className={'popup__close popup__close_login'} type='button' />
        <h2 className={'popup__title'}>Вход</h2>
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
                placeholder='Введите пароль'
                required
                minLength='8'
                className="popup__input"
              />
            </div>
          </>
          <button
            type="submit"
            className='popup__button'
          >
            Войти
          </button>
        </>
        <span className='popup__another-login'>Или
          <span onClick={handleLink} className='popup__link'> Зарегистрироваться</span>
        </span>
      </form>
    </div >
  );
};

export default Login;