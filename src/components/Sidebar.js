import React, { useContext } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import HomeIcon from '../assets/home-icon.jpg';
import AppointmentIcon from '../assets/calander-icon.jpg';
import MoodIcon from '../assets/heart.jpg';
import ResourceIcon from '../assets/library.jpg';
import AssessmentIcon from '../assets/checklist.jpg';
import MessagesIcon from '../assets/chat-icon.jpg';
import GoalsIcon from '../assets/goals.jpg';
import SettingsIcon from '../assets/setting.jpg';
import SupportIcon from '../assets/help.jpg';
import LogoutIcon from '../assets/log-out.png';

function Sidebar() {
    const { user } = useContext(UserContext);
    
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="profile-section">
                    <div className="profile-icon">
                        {user ? user.profileIcon : "?"}
                    </div>
                    <p className="patient-name">{user ? user.name : "Guest"}</p> 
                </div>
                <nav className="nav-links">
                    <Link to="/patient-dashboard"><img src={HomeIcon} alt="Home" className="icon" /> Home</Link>
                    <Link to="/appointments"><img src={AppointmentIcon} alt="Appointments" className="icon" /> Appointments</Link>
                    <Link to="/mood-tracking"><img src={MoodIcon} alt="Mood & Health" className="icon" /> Mood & Health</Link>
                    <Link to="/resources"><img src={ResourceIcon} alt="Resources" className="icon" /> Resources</Link>
                    <Link to="/self-assessment"><img src={AssessmentIcon} alt="Self-Assessments" className="icon" /> Self-Assessments</Link>
                    <Link to="/messages"><img src={MessagesIcon} alt="Messages" className="icon" /> Messages</Link>
                    <Link to="/goals"><img src={GoalsIcon} alt="Goals" className="icon" /> Goals</Link>
                    <Link to="/settings"><img src={SettingsIcon} alt="Settings" className="icon" /> Settings</Link>
                    <Link to="/support"><img src={SupportIcon} alt="Support" className="icon" /> Support</Link>
                    <Link to="/logout"><img src={LogoutIcon} alt="Log Out" className="icon" /> Log Out</Link>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
