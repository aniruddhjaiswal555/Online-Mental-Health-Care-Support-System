import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import patienticon from "../../assets/patient-icon.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Password matching check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
  
    setError(""); 
  
    try {
      const response = await axios.post("http://localhost:8810/echomind/api/patient/register/", {
        name,
        email,
        password,
        confirmPassword
      });
  
      if (response.status === 201) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/LoginPatient"), 2000);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
    
      if (error.response) {
      
        const errorMsg = error.response.data.message || "Registration failed";
        setError(errorMsg);
        toast.error(errorMsg);
      } else if (error.request) {
        
        setError("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } else {
       
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div className="signup-patient-container">
      <ToastContainer />
      <div className="patient-tagline">"Start Your Wellness Journey with Us"</div>
      <div className="patient-card">
        <img src={patienticon} alt="Patient Icon" className="patient-icon" />
        <h2>Sign Up as Patient</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-container">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="or-container">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <div className="login-prompt">
          <span><b>Already have an account?</b></span>
          <button
            className="login-button"
            onClick={() => navigate('/LoginPatient')}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
