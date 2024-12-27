import React from 'react';
import './Card.css'; 

const Card = ({ image, title, content }) => {
    return (
        <div className="card">
            <div className="image-box">
                <img src={image} alt={title} className="card-image" />
            </div>
            <h3 className="card-title">{title}</h3>
            <p className="card-content">{content}</p>
        </div>
    );
};
export default Card;
