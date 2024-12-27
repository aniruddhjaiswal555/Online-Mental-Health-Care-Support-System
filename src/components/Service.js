import React, { useState } from 'react';
import './Service.css'; 
import Therapy from "../assets/Therapy.jpg";
import Support from "../assets/support.jpg";
import Resources from "../assets/resources.jpg";
import Meditation from "../assets/meditation.jpg";
import Webinar from "../assets/webinar.jpg";
import Emergency from "../assets/emergency.jpg";
import Articles from "../assets/Articles.jpg";
import Journel from "../assets/journel.jpg";
import Exercise from "../assets/exercise.jpg";
import Food from "../assets/food.jpg";
import NewCard from './NewCard';

const issues = [
  { image: Therapy, title: "Personalized Therapy Sessions", content: "One-on-one therapy for individualized mental health support." },
  { image: Support, title: "Join Our Support Groups", content: "Share experiences in a diverse and supportive environment." },
  { image: Resources, title: "Explore Self-Care Resources", content: "Enhance your self-care routines with our curated resources." },
  { image: Meditation, title: "Mindfulness & Meditation Practices", content: "Techniques for stress reduction and enhanced well-being." },
  { image: Webinar, title: "Interactive Workshops & Webinars", content: "Engage in workshops that foster personal growth and learning." },
  { image: Emergency, title: "24/7 Crisis Support", content: "Immediate assistance is available whenever you need it." },
  { image: Articles, title: "Informative Articles & Blogs", content: "Stay informed about mental health through our resources." },
  { image: Journel, title: "Journaling for Mental Clarity", content: "Use journaling as a tool for reflection and understanding." },
  { image: Exercise, title: "Effective Coping Strategies", content: "Practical mechanisms for managing stress and anxiety." },
  { image: Food, title: "Nutrition and Mental Health", content: "Explore the connection between diet and mental well-being." },
];

const Service = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="service-container">
      <div className="service-header" onClick={toggleOpen}>
        <h3>Empowering Mental Health: We Provide Innovative Solutions and Resources</h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} toggle-icon`}></i>
      </div>
      {isOpen && (
        <div className="service-content">
          <div className="card-grid">
            {issues.map((issue, index) => (
              <NewCard 
                key={index}
                image={issue.image}
                title={issue.title}
                content={issue.content}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Service;
