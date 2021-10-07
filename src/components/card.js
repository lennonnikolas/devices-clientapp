import React from 'react';
import '../css/card.css';

// eslint-disable-next-line react/prop-types
const Card = ({id, title, subTitle, metaData, onDelete, onUpdate}) => {
  const cardData = {
    id: id,
    title: title,
    subTitle: subTitle,
    metaData: metaData
  };

  return (
    <div className='card-main' key={id}>
      <div className='card-text-content'>
        <div className='title'>System Name: {title}</div>
        <div className='subTitle'>System Type: {subTitle}</div>
        <div className='metaData'>System Size: {metaData} GB</div>
      </div>
      <div className='card-action-area'>
        <div>
          <button className='card-button' type='button' onClick={
            (event) => onUpdate(event, cardData, 'Update')}>Update</button>
        </div>
        <div>
          <button className='card-button' type='button' onClick={
            (event) => onDelete(event, cardData, 'Delete')}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
