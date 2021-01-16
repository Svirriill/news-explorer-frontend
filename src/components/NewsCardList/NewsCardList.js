import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
    const {
        loggedIn,
        onCardClick,
        newsToRender,
        savedNews,
        pathname
    } = props;

    return (
        <section className="newsCardList">
            { pathname === '/' &&
            <h1 className="newsCardList__title">Результаты поиска:</h1>
    }
            <div className="newsCardList__container">
                {newsToRender.map((article, i) => (
                    <NewsCard
                        article={article}
                        key={i}
                        loggedIn={loggedIn}
                        savedNews={savedNews}
                        onCardClick={onCardClick} />
                ))}
            </div>
        </section>
    );
}

export default NewsCardList;