import React from 'react';
import PropTypes from 'prop-types';
import './NewCard.css';
const NewCard = ({ image, title, content }) => (
  <div className="new-card">
    <div className="image-box">
      <img src={image} alt={title} />
    </div>
    <h4 className="card-title">{title}</h4>
    <p className="card-content">{content}</p>
  </div>
);

NewCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default NewCard;
