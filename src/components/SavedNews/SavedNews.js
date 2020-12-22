import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

const SavedNews = () => {

    return (
        <>
            <Header isSaved={true} name='Александр' />
            <SavedNewsHeader />
            <NewsCardList pathname='/saved-news'
            />
            <Footer />
        </>
    );
};

export default SavedNews;
