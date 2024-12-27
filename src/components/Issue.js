import React, { useState } from 'react';
import './Issue.css'; 
import academic from "../assets/acdemic.png";
import finance from "../assets/financial-worries.jpg";
import office from "../assets/Office-Stress.jpg";
import relationship from "../assets/relationship.jpg";
import family from "../assets/family-conflicts.jpg";
import social from "../assets/social-isolation.jpg";
import health from "../assets/physical-health.jpg";
import screen from "../assets/digital overload image.jpg";
import grief from "../assets/grief.jpg";
import culture from "../assets/culture.jpg"
import Card from './Card'; 
const issues = [
  { image: academic, title: "Academic Pressure", content: "Stress related to exams, assignments, and performance." },
  { image: finance, title: "Financial Pressure", content: "Worries about money and financial stability." },
  { image: office, title: "Work Stress", content: "Challenges and pressures in the workplace." },
  { image: relationship, title: "Relationship Issues", content: "Problems with partners, friends, or family." },
  { image: family, title: "Family Conflicts", content: "Disagreements and tensions within the family." },
  { image: social, title: "Social Isolation", content: "Feeling disconnected from friends and community." },
  { image: health, title: "Physical Health Issues", content: "Concerns about overall physical well-being." },
  { image: screen, title: "Digital Overload", content: "Excessive time spent on screens leading to stress." },
  { image: grief, title: "Grief and Loss", content: "Coping with the loss of a loved one." },
  { image: culture, title: "Cultural and Societal Pressures", content: "Overwhelmed by societal expectations and cultural norms." }
];
const Issue = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="issue-container" onClick={toggleOpen}>
      <div className={`issue-header ${isOpen ? 'active' : ''}`}>
        <i className={`fas fa-${isOpen ? 'chevron-up' : 'chevron-down'} toggle-icon`}></i>
        <h3>From Anxiety to Depression: A Professional Insight into Mental Health Issues</h3>
      </div>
      {isOpen && (
        <div className="issue-content">
          <div className="card-grid">
            {issues.map((issue, index) => (
              <Card 
                key={index}
                image={issue.image}
                title={issue.title}
                content={issue.content}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Issue;
