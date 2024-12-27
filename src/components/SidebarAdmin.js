/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./SidebarAdmin.css";
import { Link } from "react-router-dom";
import homeicon from "../assets/admin-home.jpg";
import therapisticon from "../assets/doctor-icon.jpg";
import patienticon from "../assets/custome-icon.jpg";
import resourceicon from "../assets/resource-icon.jpg";  // You can use a relevant icon for Resources

function SidebarAdmin() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const toggleResourcesDropdown = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  return (
    <div className="admin-navbar">
      <div className="sidebar">
        <div className="admin-icon-container">
          <div className="admin-icon">A</div>
        </div>
        <h3 className="admin-heading">Admin</h3>
        <nav className="nav-items">
          <Link className="nav-link" to="/admin-dashboard">
            <img src={homeicon} alt="Home" className="nav-icon" />
            Home
          </Link>
          <Link className="nav-link" to="/therapists">
            <img src={therapisticon} alt="Therapist" className="nav-icon" />
            Therapists
          </Link>
          <Link className="nav-link" to="/patients">
            <img src={patienticon} alt="Patient" className="nav-icon" />
            Patients
          </Link>
          <div className="nav-link" onClick={toggleResourcesDropdown}>
            <img src={resourceicon} alt="Resource" className="nav-icon" />
            Resources
          </div>
          {isResourcesOpen && (
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/upload-resource">
                Upload Resource
              </Link>
              <Link className="dropdown-item" to="/manage-resource">
                Manage Resource
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
export default SidebarAdmin;
