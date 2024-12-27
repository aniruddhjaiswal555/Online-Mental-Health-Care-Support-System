import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./Registration.css"; 
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from "axios";
const Registration = () => {
  const [formData, setFormData] = useState({  
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate("/login"); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      console.log("Goo gelchode")
      return;
    }
    try {
      const response = await axios.post("http://localhost:8810/echomind/api/therapist/register/", formData);

      if (response.status === 201) {
        toast.success(response.data.message); 
        navigate("/login"); 
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      if (error.response) {
      
        toast.error(error.response.data.message || "An error occurred, please try again!");
      } else if (error.request) {
      
        toast.error("No response from server. Please check your connection.");
      } else {
     
        toast.error("Error: " + error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="left">
        <h2 className="login-heading">Create Your Account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input-field"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-btn" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="input-field"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-btn" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="sign-in-btn">Register</button>
        </form>
      </div>
      <div className="right">
        <h2 className="login-heading">Already have an account?</h2>
        <button className="sign-in-btn" onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Registration;
