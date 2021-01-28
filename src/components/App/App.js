import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import * as newsApi from '../../utils/NewsApi'
import * as mainApi from '../../utils/MainApi';

const App = () => {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [error, setError] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const [isSearchError, setSearchError] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState(0);
    const [news, setNews] = React.useState([]);
    const [savedNews, setSavedNews] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const history = useHistory();
    const { pathname } = useLocation();

    useEffect(() => {
        (!loggedIn && pathname === '/saved-news') && setIsLoginOpen(true);
    }, [loggedIn, pathname]);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi.getUserInfo(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    setCurrentUser(res.data);
                    getSavedNews();
                })
                .catch((err) => console.log(err));
        }
    }, []);

    React.useEffect(() => {
        const localStorageNews = JSON.parse(localStorage.getItem('news'));
        if (localStorageNews && localStorageNews.length) {
            setNews(localStorageNews);
            setIsSearch(true);
        }
    }, []);

    React.useEffect(() => {
        function closeOnEsc(evt) {
            if (evt.key === 'Escape' || evt.key === 'Esc') {
                handlePopupsClose();
            }
        }
        document.addEventListener("keyup", closeOnEsc);

        return () => {
            document.removeEventListener("keyup", closeOnEsc);
        };
    }, []);

    function handleShowMore() {
        setCurrentRow(currentRow + 1);
    };

    function handleLoginPopupOpen() {
        setIsLoginOpen(true);
    };

    function handleLoginOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser({});
        history.push('/');
    };

    function handlePopupsClose() {
        setIsRegister(false);
        setIsLoginOpen(false);
        setIsConfirmOpen(false);
        setError('');
    };

    function handleTogglePopup() {
        setError('');
        setIsLoginOpen(!isLoginOpen);
        setIsRegister(!isRegister);
    };

    function handleOpenLogin() {
        setError('');
        setIsConfirmOpen(false);
        setIsLoginOpen(true);
    };

    function handleNewsSearch(keyword, setErrorMessage) {
        if (!keyword) {
            setErrorMessage('Нужно ввести ключевое слово');
            return;
        }
        setLoading(true);
        setIsSearch(false);
        setCurrentRow(0);
        newsApi
            .getNews(keyword)
            .then((res) => {
                const news = res.articles.map((item) => ({ ...item, keyword }));
                setNews(news);
                localStorage.setItem('news', JSON.stringify(news));
                setIsSearch(true);
                setSearchError(false);
            })
            .catch((err) => {
                console.log(`Ошибка при загрузке новостей: ${err}`);
                setSearchError(true);
            })
            .finally(() => setLoading(false));
    };

    function handleRegister(email, password, name) {
        setDisabled(true);
        mainApi.register(email, escape(password), name)
            .then((res) => {
                setIsRegister(false);
                setIsConfirmOpen(true);
            })
            .catch((err) => setError(err.message))
            .finally(() => setDisabled(false));
    };

    function handleLogin(email, password) {
        setDisabled(true);
        mainApi.authorize(email, escape(password))
            .then((data) => {
                mainApi.getUserInfo(data)
                    .then((res) => setCurrentUser(res.data))
                    .catch((err) => setError(err.message));
                setLoggedIn(true);
                setIsLoginOpen(false);
                getSavedNews();
                console.log(data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setDisabled(false));
    };

    function getSavedNews() {
        mainApi.getSavedNews()
            .then((news) => setSavedNews(news.data))
            .catch(err => console.log(`Ошибка при загрузке сохранённых новостей: ${err.message}`));
    };

    function handleArticleSave(article) {
        if (!loggedIn) return setIsRegister(true);
        const saved = savedNews.find((i) => i.publishedAt === article.publishedAt && i.title === article.title);
        if (!saved) {
            mainApi.saveArticle(article)
                .then(newArticle => setSavedNews([newArticle, ...savedNews]))
                .catch((err) => console.log(err));
            return;
        }
        handleDeleteArticle(saved);
    };

    function handleDeleteArticle(article) {
        mainApi.deleteArticle(article._id)
            .then(() => setSavedNews(savedNews.filter((item) => item._id !== article._id)))
            .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
    };
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <NewsContext.Provider value={{ news, savedNews }}>
                <div className='app'>
                    <Header
                        loggedIn={loggedIn}
                        openLogin={handleLoginPopupOpen}
                        handleLoginOut={handleLoginOut} />
                    <Switch>
                        <Route exact path='/'>
                            <Main
                                handleSearch={handleNewsSearch}
                                loggedIn={loggedIn}
                                isLoading={isLoading}
                                isError={isSearchError}
                                onCardClick={handleArticleSave}
                                onShowMore={handleShowMore}
                                isSearch={isSearch}
                                currentRow={currentRow}
                                pathname={pathname} />
                        </Route>
                        <ProtectedRoute
                            path='/saved-news'
                            component={SavedNews}
                            loggedIn={loggedIn}
                            onCardClick={handleArticleSave} />
                    </Switch>
                    <Footer />
                    <Register
                        isOpen={isRegister}
                        onClose={handlePopupsClose}
                        onChange={handleTogglePopup}
                        onRegister={handleRegister}
                        authError={error} />
                    <Login
                        isOpen={isLoginOpen}
                        onClose={handlePopupsClose}
                        onChange={handleTogglePopup}
                        authError={error}
                        onLogin={handleLogin}
                        disabled={disabled} />
                    <InfoTooltip
                        isOpen={isConfirmOpen}
                        onClose={handlePopupsClose}
                        onChange={handleOpenLogin}
                        disabled={disabled} />
                </div>
            </NewsContext.Provider>
        </CurrentUserContext.Provider >
    );
}

export default App;