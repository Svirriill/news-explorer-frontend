import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Main = (props) => {
    const { isRegister, setIsRegister, isConfirmOpen, isLoginOpen, setIsLoginOpen, setIsConfirmOpen } = props;
    const toggleLoginForm = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const toggleRegisterForm = () => {
        setIsRegister(!isRegister);
    };

    const toggleConfirmForm = () => {
        setIsConfirmOpen(!isConfirmOpen);
    };

    return (
        <>
            <div className='main__background'>
                <Header
                    checkPage={true}
                    isPopupOpen={isLoginOpen}
                    toggleForm={toggleLoginForm}
                />
                <Search />
            </div>
            <NewsCardList main={true} />
            <About />
            <Footer />
            <Login
                isPopupOpen={isLoginOpen}
                toggleForm={toggleLoginForm}
                setIsRegisterOpen={setIsRegister}

            />
            <Register
                isPopupOpen={isRegister}
                toggleForm={toggleRegisterForm}
                setIsLoginOpen={setIsLoginOpen}

            />
            <PopupWithForm
                isPopupOpen={isConfirmOpen}
                toggleForm={toggleConfirmForm}
                setIsLoginOpen={setIsLoginOpen}
            />
        </>
    );
}

export default Main;