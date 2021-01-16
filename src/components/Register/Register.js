import React from 'react';
import Input from '../Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/ValidationForm';
import './Register.css';

const Register = (props) => {
    const { isOpen, onClose, onChange, onRegister, authError, disabled } = props;

    const emailField = useFormWithValidation();
    const passwordField = useFormWithValidation();
    const nameField = useFormWithValidation();

    function handleClose() {
        emailField.setErrorMessage('');
        emailField.setValue('');
        emailField.setIsValid(false);
        passwordField.setErrorMessage('');
        passwordField.setValue('');
        passwordField.setIsValid(false);
        nameField.setErrorMessage('');
        nameField.setValue('');
        nameField.setIsValid(false);
        onClose();
    };

    function handleRegister(evt) {
        evt.preventDefault();
        onRegister(emailField.value, passwordField.value, nameField.value);
    };

    return (
        <PopupWithForm
            name='register'
            isOpen={isOpen}
            onClose={handleClose}
            onChange={onChange}
            isFormValid={emailField.isValid && passwordField.isValid && nameField.isValid}
            onSubmit={handleRegister}
            authError={authError}
            disabled={disabled}
            submitButtonText='Зарегистрироваться'>
            <h2 className={'popup__title'}>Регистрация</h2>
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
            <Input
                label='Имя'
                type='text'
                minLength='2'
                maxLength='20'
                required={true}
                {...nameField}
                inputFieldClassName='popup__input'
                placeholder='Введите имя' />
        </PopupWithForm>
    );
};

export default Register;
