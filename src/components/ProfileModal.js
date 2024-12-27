/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './ProfileModal.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 
import { useTherapist } from '../Context/TherapistContext';

const ProfileModal = ({ isOpen, onClose, userEmail }) => {
    if (!isOpen) return null;
    const navigate = useNavigate(); 
    const profileLetter = userEmail.charAt(0).toUpperCase();
    const { clearEmail } = useTherapist(); 

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8810/echomind/api/therapist/logout/');
            if (response.status === 201) {
                toast.success(response.data.message);
                clearEmail(); 
                onClose();
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data.message || "Logout failed. Please try again."); // Show error toast
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="profile-icon">
                    <div className="profile-letter">{profileLetter}</div>
                </div>
                <ul>
                    <li>
                        <button onClick={() => console.log("Settings Clicked")}>Settings</button>
                    </li>
                    <li>
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </li>
                </ul>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

ProfileModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userEmail: PropTypes.string.isRequired,
};

export default ProfileModal;
