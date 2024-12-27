import React from 'react';
import './Quote.css';
import Image from '../assets/family.jpg'; 

function Quote() {
    return (
        <div className="half-box">
            <div className="image-section">
                <img src={Image} alt="Descriptive Alt Text" />
            </div>
            <div className="message-section">
                <p><strong>When each family member nurtures their mental wellness, the entire family thrives. Taking care of ourselves allows us to bring love, understanding, and harmony to our home</strong></p>
            </div>
        </div>
    );
}

export default Quote;
