import React from 'react';
import photo from '../../images/avatar.jpg'
import './About.css';

const About = () => {

    return (
        <div className='about'>
            <div className='about__container-image'>
                <img className='about__image' src={photo} alt='Профиль автора' />
            </div>
            <div className='about__container'>
                <h2 className='about__title'>Об авторе</h2>
                <p className='about__info'>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
 Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
            </div>
        </div>
    );
}

export default About;
