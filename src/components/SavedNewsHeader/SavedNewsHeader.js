import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = () => {

    return (
        <div className='news'>
            <p className='news__info'>Сохраненные статьи</p>
            <h1 className='news__title'>Грета, у вас 5 сохранённых статей</h1>
            <span className='news__keywords'>По ключевым словам: <span className='news__tag'>Природа, Тайга и 2-м другим.</span>
            </span>
        </div>
    )
}

export default SavedNewsHeader;