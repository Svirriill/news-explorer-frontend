import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => {
    const { checkPage, toggleForm, isSaved, name, isPopupOpen, handleBurger, isMenuOpen } = props;
    const history = useHistory();

    const handleToggle = () => {
        handleBurger();
        toggleForm();
    }

    const handleExit = () => {
        history.push('/');
    }
    return (
        <>
            {isPopupOpen ? '' :
                <div onClick={handleBurger} className={`nav__button ${isMenuOpen ? 'change' : ''}`}>
                    <span className={`nav__button-line ${checkPage ? '' : 'nav__button-line_black'} ${isMenuOpen ? 'nav__button-line_esc nav__button-line_white' : ''}`}></span>
                    <span className={`nav__button-line ${checkPage ? '' : 'nav__button-line_black'} ${isMenuOpen ? 'nav__button-line_esc nav__button-line_white' : ''}`}></span>
                </div>
            }
            <nav className={isMenuOpen ? 'nav nav_visible' : 'nav'}>
                <NavLink to='/' className={`nav__link ${checkPage ? 'nav__light nav__link_active nav__link_active_light-theme' : ''}
    ${isMenuOpen ? 'nav__light' : ''}`}>Главная</NavLink>
                {!checkPage ?
                    <NavLink to='/saved-news' className={`nav__link ${isMenuOpen ? 'nav__light' : 'nav__link_active'}`}>Сохраненные статьи</NavLink> : ''
                }
                <span
                    onClick={isSaved ? handleExit : handleToggle}
                    className={`nav__border ${checkPage ? 'nav__light' : 'nav__border_dark'} 
    ${isMenuOpen ? 'nav__border_light' : ''} `}
                >
                    <span className={`nav__border-link ${(isMenuOpen || checkPage) ? 'nav__light' : ''}`} >
                        {name ? name : 'Авторизоваться'}
                    </span>
                    {
                        name && !checkPage ?
                        
                            <span className='nav__logout' /> : ''
                    }
                </span>
            </nav>
        </>
    );
}

export default Navigation;
