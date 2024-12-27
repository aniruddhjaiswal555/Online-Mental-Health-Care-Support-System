import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import './LoginPage.css';
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTherapist } from '../../Context/TherapistContext'; 

function Loginpage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setEmail } = useTherapist(); 
  const navigate = useNavigate(); 
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleSignup = () => navigate("/register"); 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8810/echomind/api/therapist/login", formData);
      if (response.status === 200) {
        toast.success("Login successful!");
        setEmail(formData.email); 
        localStorage.setItem("token", response.data.token); 
        navigate("/Therapistdashboard", { state: { userEmail: formData.email } });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed!");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="left">
        <h1 className="login-heading">Login to Your Account</h1>
        <div className="social-icons">
          <FaGoogle className="icon icon-google" aria-label="Login with Google" />
          <FaFacebookF className="icon icon-facebook" aria-label="Login with Facebook" />
          <FaLinkedinIn className="icon icon-linkedin" aria-label="Login with LinkedIn" />
        </div>
        <div className="divider-container">
          <hr className="divider-line" />
          <span className="divider-text">or</span>
          <hr className="divider-line" />
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-icon"
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex="0"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>
      </div>
      <div className="right">
        <h1 className="headline">New Here?</h1>
        <p className="line">Sign up here and start your new journey with Echomind...</p>
        <button className="btn" onClick={handleSignup}>Sign up</button>
      </div>
    </div>
  );
}

export default Loginpage;
