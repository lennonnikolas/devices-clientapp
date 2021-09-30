import React from 'react';
import '../css/card.css';

const Card = ({id, title, subTitle, metaData}) => {
  return (
    <div className='card-container' key={id}>
      <div className='title'>{title}</div>
      <div className='subTitle'>{subTitle}</div>
      <div className='metaData'>{metaData}</div>
    </div>
  );
};

export default Card;
