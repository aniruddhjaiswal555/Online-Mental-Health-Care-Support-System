/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import './PatientDashboard.css';
import MainLayout from "../../Layout/MainLayout";
import MessageBox from "../../components/MessageBox";
import Image1 from '../../assets/mindfullness.jpg';
import Image2 from '../../assets/nature.jpg';
import Image3 from '../../assets/counselling.jpg';
import Quote from "../../components/Quote";
import Issue from "../../components/Issue";
import Service from "../../components/Service";

function AdditionalMessageBox({ message, className }) {
    return (
        <div className={`additional-message-box ${className}`}>
            <p><strong>{message}</strong></p>
        </div>
    );
}

function PatientDashboard() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [Image1, Image2, Image3];

    const handleImageClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };


    return (
        <div className="dashboard-container">
            <MainLayout />
            <div className="dashboard-content">
                <div className="message-image-container">
                    <div className="message-container">
                        <MessageBox message="Welcome to EchoMind! We're dedicated to supporting you on your path to wellness. Explore your dashboard for insights into your progress and resources designed for your mental health journey." />
                        <AdditionalMessageBox message="We're here to provide you with the resources and support you need for a healthier mind. Our platform offers access to a wide range of tools, including expert articles, guided meditations, and interactive forums." />
                        <AdditionalMessageBox 
                            message="Feel free to share your problems with us at any time. Your privacy and comfort are our top priorities, and we're here to support you. Remember, reaching out is a sign of strength, and our dedicated team is always ready to listen and provide the assistance you need." 
                            className="assurance-message" 
                        />
                    </div>
                    <div className="image-deck-container" onClick={handleImageClick}>
                        {images.map((image, index) => (
                            <div 
                                key={index} 
                                className={`image-card ${index === currentImageIndex ? 'active' : ''}`} 
                                style={{
                                    zIndex: index === currentImageIndex ? 1 : 0,
                                    transform: `translateY(-${index * 15}px)`,
                                    opacity: index === currentImageIndex ? 1 : 0.7,
                                }}>
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <Quote />
                    <Issue />
                    <Service />
                </div>
              
            </div>
        </div>
    );
}

export default PatientDashboard;
