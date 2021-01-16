import React, { useContext } from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { NewsContext } from '../../contexts/NewsContext';

const SavedNews = (props) => {
    const { loggedIn, onCardClick } = props;

    const { savedNews } = useContext(NewsContext);

    return (
        <>
            <SavedNewsHeader loggedIn={loggedIn} />
            <NewsCardList pathname='/saved-news'
                loggedIn={loggedIn}
                newsToRender={savedNews}
                onCardClick={onCardClick}
            />
        </>
    );
};

export default SavedNews;