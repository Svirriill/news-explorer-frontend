import React, { useContext } from 'react';
import Link from '../Link/Link';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Navigation.css';

const Navigation = (props) => {

    const {
        loggedIn,
        isMenuOpen,
        pathname,
        handleLoginOut,
        onClick,
        handleBurger
    } = props;

    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <div onClick={handleBurger} className={`nav__button ${isMenuOpen ? 'change' : ''}`}>
                <span className={`nav__button-line ${pathname === '/' ? '' : 'nav__button-line_black'} ${isMenuOpen ? 'nav__button-line_esc nav__button-line_white' : ''}`}></span>
                <span className={`nav__button-line ${pathname === '/' ? '' : 'nav__button-line_black'} ${isMenuOpen ? 'nav__button-line_esc nav__button-line_white' : ''}`}></span>
            </div>
            <nav onClick={handleBurger} className={isMenuOpen ? 'nav nav_visible' : 'nav'}>
                <Link
                    linkClassName={`nav__link ${(pathname === '/') && 'nav__light nav__link_active_light-theme'} ${isMenuOpen && 'nav__light'} `}
                    activeLinkClassName='nav__link_active'
                    path='/'>Главная</Link>
                {loggedIn &&
                    <Link
                        linkClassName={`nav__link ${(pathname === '/' || isMenuOpen) ? 'nav__light' : ''}`}
                        activeLinkClassName='nav__link_active'
                        path='/saved-news'>Сохраненные статьи</Link>
                }
                <span
                    onClick={loggedIn ? handleLoginOut : onClick}
                    className={`nav__border ${pathname === '/' ? 'nav__light' : 'nav__border_dark'} 
    ${isMenuOpen ? 'nav__border_light' : ''} `}
                >
                    <span className={`nav__border-link ${(isMenuOpen || pathname === '/') ? 'nav__light' : ''}`} >
                        {loggedIn ? currentUser.name : 'Авторизоваться'}
                    </span>
                    {
                        loggedIn ?
                            <span className={`nav__logout ${pathname === '/' ? 'nav__logout_light' : 'nav__logout_dark'} ${isMenuOpen ? 'nav__logout_light' : 'nav__logout_dark'}`} /> : ''
                    }
                </span>
            </nav>
        </ >

    );
}

export default Navigation;
