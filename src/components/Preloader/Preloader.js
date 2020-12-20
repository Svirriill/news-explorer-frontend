import React from 'react';
import './Preloader.css';
function Preloader({ isContent }) {
    const logoClass = (isContent) ? 'preloader-spin' : 'preloader-logo';
    const textClass = (isContent) ? 'Идет поиск новостей...' : 'К сожалению по вашему запросу ничего не найдено.';
    return (
        <section className="preloader">
            <i className={logoClass} />
            {(isContent) ? '' : <h3 className="preloader__title">Ничего не найдено</h3>}
            <p className="preloader__text">{textClass}</p>
        </section>
    );
}

export default Preloader;