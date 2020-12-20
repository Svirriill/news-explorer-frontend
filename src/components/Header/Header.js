import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = (props) => {
  const { checkPage, toggleForm, isSaved, name, isPopupOpen } = props;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleBurger = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <div className='header'>
      <div className='header__container'>
        <h2 className={`header__title ${checkPage ? 'header__light' : ''} ${isMenuOpen ? 'header__light' : ''}`}>NewsExplorer</h2>
        <Navigation
          checkPage={checkPage}
          toggleForm={toggleForm}
          isSaved={isSaved}
          name={name}
          isPopupOpen={isPopupOpen} 
          handleBurger={handleBurger}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </div >
  );
}

export default Header;