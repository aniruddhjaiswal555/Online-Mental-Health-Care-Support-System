import React, { useState } from "react";
import "./Navbar.css";
import ProfileModal from "../components/ProfileModal"; 
import { useNavigate } from "react-router-dom";
import { useTherapist } from "../Context/TherapistContext"; 
function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { therapistEmail } = useTherapist();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Therapist Dashboard</h1>
                <nav className="navbar">
                    <ul>
                        <li><button onClick={() => handleNavigation("/Therapistdashboard")}>Home</button></li>
                        <li><button onClick={() => handleNavigation("/Appointment")}>Appointments</button></li>
                        <li><button onClick={() => handleNavigation("/Patient")}>Patients</button></li>
                        <li><button onClick={toggleModal}>Profile</button></li>
                    </ul>
                </nav>
            </header>
            
            <ProfileModal isOpen={isModalOpen} onClose={toggleModal} userEmail={therapistEmail}/>
        </div>
    );
}

export default Navbar;
