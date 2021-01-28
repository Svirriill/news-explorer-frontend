import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <span className='not-found__icon'></span>
        <h3 className="not-found__title">Ничего не найдено</h3>
        <p className="not-found__paragraph">К сожалению по вашему запросу ничего не найдено.</p>
      </div>
    </section>
  );
}

export default NotFound;
