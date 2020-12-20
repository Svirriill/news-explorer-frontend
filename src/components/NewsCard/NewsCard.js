import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
    const { image, date, title, text, source, keyword, tooltip, iconSave, url } = props;
    const [isSavedMark, setIsSavedMark] = React.useState(false);

    function handleSavedMark() {
        isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
    }

    return (
        <div className="newsCard">
            {
                iconSave ?
                    <button type="button" className={`${isSavedMark ? "newsCard__button-save-mark" : "newsCard__button-save"}`} onClick={handleSavedMark} />
                    :
                    <button type="button" className="newsCard__button-remove" />
            }
            <div className="newsCard__tooltip" >{tooltip}</div>
            {keyword && <div className="newsCard__keyword">{keyword}</div>}
            <a href={url} className="newsCard__link" target="_blank" rel="noreferrer">
                <img className="newsCard__image" src={image} alt={title} />
                <div className="newsCard__container">
                    <p className="newsCard__date">{date}</p>
                    <h1 className="newsCard__title">{title}</h1>
                    <p className="newsCard__text">{text}</p>
                </div>
                <p className="newsCard__source">{source}</p>
            </a>

        </div>
    );
}

export default NewsCard;