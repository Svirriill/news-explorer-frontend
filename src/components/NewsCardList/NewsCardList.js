import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import tree1 from '../../images/tree1.jpg';
import tree2 from '../../images/tree2.jpg';
import tree3 from '../../images/tree3.png';

function NewsCardList({ pathname }) {
    return (
        <section className="newsCardList">
            {
                pathname === "/saved-news"
                    ?
                    <div className="newsCardList__container">
                        <NewsCard
                            image={tree1}
                            date="2 августа, 2019"
                            title="Национальное достояние – парки"
                            text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, 
                            где и сегодня каждый может приобщиться к природе."
                            source="Лента.ру"
                            keyword="Природа"
                            tooltip="Убрать из сохранённых"
                            iconSave={false}
                            url="https://lenta.ru"
                        />
                        <NewsCard
                            image={tree2}
                            date="2 августа, 2019"
                            title="Лесные огоньки: история одной фотографии"
                            text="Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного 
                            из местных чудес природы."
                            source="Медуза"
                            keyword="Природа"
                            tooltip="Убрать из сохранённых"
                            iconSave={false}
                            url="https://meduza.io"
                        />
                        <NewsCard
                            image={tree3}
                            date="2 августа, 2019"
                            title="Национальное достояние – парки"
                            text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, 
                            где и сегодня каждый может приобщиться к природе."
                            source="Риа"
                            keyword="Тайга"
                            tooltip="Убрать из сохранённых"
                            iconSave={false}
                            url="https://ria.ru"
                        />
                    </div>
                    :
                    <>
                        <h2 className='newsCardList__title'>Результаты поиска</h2>
                        <div className="newsCardList__container">

                            <NewsCard
                                image={tree1}
                                date="2 августа, 2019"
                                title="Национальное достояние – парки"
                                text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, 
                                где и сегодня каждый может приобщиться к природе."
                                source="Лента.ру"
                                tooltip="Войдите, чтобы сохранять статьи"
                                iconSave={true}
                                url="https://lenta.ru"
                            />
                            <NewsCard
                                image={tree2}
                                date="2 августа, 2019"
                                title="Лесные огоньки: история одной фотографии"
                                text="Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного 
                                из местных чудес природы."
                                source="Медуза"
                                tooltip="Войдите, чтобы сохранять статьи"
                                iconSave={true}
                                url="https://meduza.io"
                            />
                            <NewsCard
                                image={tree3}
                                date="2 августа, 2019"
                                title="«Первозданная тайга»: новый фотопроект Игоря Шпиленка"
                                text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, 
                                где и сегодня каждый может приобщиться к природе."
                                source="Риа"
                                tooltip="Войдите, чтобы сохранять статьи"
                                iconSave={true}
                                url="https://ria.ru"
                            />
                        </div>
                        <button className='newsCardList__show'>Показать еще</button>

                    </>
            }
        </section>
    );
}

export default NewsCardList;