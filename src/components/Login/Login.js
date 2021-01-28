import React from 'react';
import Input from '../Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/ValidationForm';
import './Login.css';

const Login = (props) => {
  const { isOpen, onClose, onChange, onLogin, authError, disabled } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  function handleClose() {
    emailField.setErrorMessage('');
    emailField.setValue('');
    passwordField.setErrorMessage('');
    passwordField.setValue('');
    emailField.setIsValid(false);
    passwordField.setIsValid(false);
    onClose();
  };

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin(emailField.value, passwordField.value);
  };

  return (
    <PopupWithForm
      name='login'
      isOpen={isOpen}
      onClose={handleClose}
      onChange={onChange}
      isFormValid={emailField.isValid && passwordField.isValid}
      onSubmit={handleLogin}
      authError={authError}
      disabled={disabled}
      submitButtonText='Войти'>
      <h2 className={'popup__title'}>Вход</h2>
      <Input
        label='Email'
        type='email'
        minLength='6'
        maxLength='20'
        required={true}
        autoComplete='email'
        {...emailField}
        inputFieldClassName='popup__input'
        placeholder='Введите почту' />
      <Input
        label='Пароль'
        type='password'
        minLength='8'
        maxLength='20'
        required={true}
        autoComplete='password'
        {...passwordField}
        inputFieldClassName='popup__input'
        placeholder='Введите пароль' />
    </PopupWithForm>
  );
};

export default Login;