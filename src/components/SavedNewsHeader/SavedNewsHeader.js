import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ loggedIn }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const { savedNews } = React.useContext(NewsContext);

    const keywords = loggedIn ? savedNews.map(item => item.keyword) : [];

    const articlesDeclension = (array) => {
        return ['статья', 'статьи', 'статей'][
            array.length === 0 && 0
                && array.length % 10 === 1 && array.length % 100 !== 11
                ? 0
                : array.length % 10 >= 2
                    && array.length % 10 <= 4 && (array.length % 100 < 10 || array.length % 100 >= 20)
                    ? 1
                    : 2];
    }

    const numberDeclension = (array) => {
        return ['му', 'м', 'и'][
            array.slice(3).length % 10 === 1
                && array.slice(3).length % 100 !== 11
                ? 0
                : array.slice(3).length % 10 >= 2
                    && array.slice(3).length % 10 <= 4
                    && (array.slice(3).length % 100 < 10 || array.slice(3).length % 100 >= 20)
                    ? 1
                    : 2];
    }

    const adjectiveDeclination = (array) => {
        return ['другому', 'другим'][
            array.slice(3).length % 10 === 1
                && array.slice(3).length % 100 !== 11
                ? 0
                : 1];
    }

    const keywordsSorted = [...new Set(keywords)]
        .map(value => {
            const item = {};
            item.keyword = value;
            item.quantity = keywords.filter(str => str === value).length;
            return item;
        })
        .sort((a, b) => b.quantity - a.quantity)
        .map(item => item.keyword);

    const keywordsToRender = keywordsSorted.length <= 3
        ? keywordsSorted.join(', ')
        : `${keywordsSorted
            .slice(0, 3)
            .join(', ')} и ${keywordsSorted
                .slice(3)
                .length}-${numberDeclension(keywordsSorted)} ${adjectiveDeclination(keywordsSorted)}`;

    return (
        <div className='news'>
            <p className='news__info'>Сохраненные статьи</p>
            <h1 className='news__title'>{currentUser.name}, у вас {savedNews.length} сохранённых {articlesDeclension(savedNews)}</h1>
            <span className='news__keywords'>По ключевым словам:
            <span className='news__tag'>{keywordsToRender}</span>
            </span>
        </div>
    )
}

export default SavedNewsHeader;