import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function InfoTooltip(props) {
  const { isOpen, onClose, onChange } = props;

  return (
    <PopupWithForm
      name='tooltip'
      isOpen={isOpen}
      onClose={onClose}
      onChange={onChange}>
      <label className='popup__title'>Пользователь успешно зарегистрирован!</label>
    </PopupWithForm>
  )
}