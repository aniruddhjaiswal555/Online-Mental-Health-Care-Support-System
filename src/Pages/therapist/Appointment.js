import React from "react";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
function Appointment()
{
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div>
              <Navbar></Navbar>
        </div>
    );
}
export default Appointment;