import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import logoGithub from '../../images/logoGithub.png';
import logoFacebook from '../../images/logoFacebook.png';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">&copy; 2020 Supersite, Powered by News API</p>
            <div className='footer__container'>
            <ul className="footer__nav">
                <li className="footer__item-main">
                    <NavLink exact to="/" className="footer__link" >Главная</NavLink>
                </li>
                <li className="footer__item-praktikum" >
                    <a href="https://praktikum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                </li>
                </ul>
            <ul className="footer__icon">
                <li className="footer__logo">
                    <a href="https://github.com" className="footer__link" target="_blank" rel="noreferrer">
                        <img className="footer__logo-link" src={logoGithub} alt="logo GitHub" />
                    </a>
                </li>
                <li className="footer__logo">
                    <a href="https://facebook.com" className="footer__link" target="_blank" rel="noreferrer">
                        <img className="footer__logo-link" src={logoFacebook} alt="logo Facebook" />
                    </a>
                </li>
            </ul>
            </div>
        </footer>
    );
}

export default Footer;