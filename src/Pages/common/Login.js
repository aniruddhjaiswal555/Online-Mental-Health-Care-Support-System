import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import adminicon from "../../assets/admin-icon.jpg";
import therapisticon from "../../assets/therapist-icon.jpg";
import patienticon from "../../assets/patient-icon.jpg";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    switch (userType) {
      case "admin":
        navigate("/LoginAdmin");
        break;
      case "therapist":
        navigate("/login");
        break;
      case "patient":
        navigate("/LoginPatient");
        break;
      default:
        console.error("Invalid user type");
    }
  };

  return (
    <div className="login-container">
      {/* Left Part */}
      <div className="left-part"></div>

      {/* Right Part */}
      <div className="right-part">
        <h1 className="heading">Your Journey to Mental Wellness Starts Here . . .</h1>
        <div className="cards-container">
          <div className="card">
            <img src={adminicon} alt="Admin Icon" className="card-icon" />
            <button className="card-button" onClick={() => handleLogin("admin")}>Login as Admin</button>
          </div>
          <div className="card">
            <img src={therapisticon} alt="Therapist Icon" className="card-icon" />
            <button className="card-button" onClick={() => handleLogin("therapist")}>Login as Therapist</button>
          </div>
          <div className="card">
            <img src={patienticon} alt="Patient Icon" className="card-icon" />
            <button className="card-button" onClick={() => handleLogin("patient")}>Login as Patient</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
