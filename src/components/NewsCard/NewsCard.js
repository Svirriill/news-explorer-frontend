import React, { useContext } from 'react';
import { NewsContext } from '../../contexts/NewsContext';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';

function NewsCard(props) {
    const {
        loggedIn, onCardClick, article
    } = props;

    const { keyword, title, description, publishedAt, url, urlToImage, source } = article;

    const { savedNews } = useContext(NewsContext);
    const { pathname } = useLocation();

    const isSaved = loggedIn
        && savedNews.some((i) => i.publishedAt === article.publishedAt
            && i.title === article.title);

    const options = {
        month: 'long',
        day: 'numeric',
    };

    const date = new Date(publishedAt);
    const dayAndMonth = date.toLocaleString('ru', options);
    const fullDate = dayAndMonth + ', ' + date.getFullYear();

    const tooltipText =
        (!loggedIn)
            ? 'Войдите, чтобы сохранять статьи'
            : `${isSaved && 'Убрать из сохранённых'}`;

    function handleCardButtonClick() {
        onCardClick(article);
    }

    return (
        <div className="newsCard">
            { pathname === '/saved-news'
                ? <span className='newsCard__tag newsCard__tag_position-left'>{keyword}</span>
                : ''}
            {
                (pathname === '/' && !isSaved) &&
                <div className='newsCard__button-save' onClick={handleCardButtonClick} ></div>
            }
            {
                (pathname === '/' && isSaved) &&
                (<div className='newsCard__button-save-mark' onClick={handleCardButtonClick} ></div>)
            }
            {
                pathname !== '/' &&
                (<div className='newsCard__button-remove' onClick={handleCardButtonClick} ></div>)
            }
            { (!loggedIn || (loggedIn && isSaved)) &&
                <span className={`newsCard__tooltip`}>{tooltipText}</span>}
            <a href={url} className="newsCard__link" target="_blank" rel="noreferrer">
                <img className="newsCard__image" src={urlToImage} alt={title} />
                <div className="newsCard__container">
                    <p className="newsCard__date">{fullDate}</p>
                    <h1 className="newsCard__title">{title}</h1>
                    <p className="newsCard__text">{description}</p>
                    {/* <a href={url} className="newsCard__source" target="_blank" rel="noreferrer">{pathname === '/' ? source.name : source}</a> */}
                    <p className="newsCard__source">{pathname === '/' ? source.name : source}</p>
                </div>
            </a>
        </div>
    );
}

export default NewsCard;