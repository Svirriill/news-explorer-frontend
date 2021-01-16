import React from 'react';
import Navigation from '../Navigation/Navigation';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
  const { loggedIn, handleLoginOut, openLogin } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleBurger = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const { pathname } = useLocation();

  return (
      <div className={`header ${pathname === "/" ? 'header_image' : ''}`}>
        <NavLink className='header__title-link' to='/'>
          <h2 className={`header__title ${pathname === '/' ? 'header__light' : ''} ${isMenuOpen ? 'header__dark' : ''}`}>NewsExplorer</h2>
        </NavLink>
        <Navigation
          loggedIn={loggedIn}
          pathname={pathname}
          isMenuOpen={isMenuOpen}
          handleLoginOut={handleLoginOut}
          onClick={openLogin}
          handleBurger={handleBurger}
        />
      </div>
  );
}

export default Header;