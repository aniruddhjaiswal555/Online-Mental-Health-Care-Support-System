import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPatient.css";
import patienticon from "../../assets/patient-icon.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

function LoginPatient() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(false);    

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8810/echomind/api/patient/login/", {
        email,
        password,
      });
      
      if (response.status === 200) {
        const { username } = response.data; 
        localStorage.setItem("userEmail", email); 
        localStorage.setItem("username", username); 
        updateUser(username, email); 
        navigate('/patient-dashboard'); 
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-patient-container">
      <div className="patient-tagline">"A Safe Space for Your Wellness Journey"</div>
      <div className="patient-card">
        <img src={patienticon} alt="Patient Icon" className="patient-icon" />
        <h2>Login as Patient</h2>
        {error && <p className="error-message">{error}</p>}  
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              id="password"
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}  
          </button>
        </form>
        <div className="or-container">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <div className="signup-prompt">
          <span><b>Don't have an account?</b></span>
          <button 
            className="signup-button" 
            onClick={() => navigate('/signup')} 
          >
            Sign Up
          </button>
       </div>
      </div>
    </div>
  );
}

export default LoginPatient;
