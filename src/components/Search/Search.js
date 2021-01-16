import React from 'react';
import Input from '../Input/Input';
import { useFormWithValidation } from '../../utils/ValidationForm';
import './Search.css';

const Search = (props) => {
  const { handleSearch, isLoading } = props;

  const searchField = useFormWithValidation();

  function handleSubmit(evt) {
    const { value, setErrorMessage } = searchField;
    evt.preventDefault();
    handleSearch(value, setErrorMessage);
  };

  return (
    <div className='search'>
      <h1 className='search__title'>Что творится в мире?</h1>
      <p className='search__info'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form onSubmit={handleSubmit} className='search__form' noValidate>
      <Input
          inputFieldClassName='search__input'
          placeholder='Введите тему новости'
          name='search'
          type='text'
          {...searchField}
          disabled={isLoading} />
        <button
          className='search__button'
          >Искать</button>
      </form>
    </div>
  );
}

export default Search;