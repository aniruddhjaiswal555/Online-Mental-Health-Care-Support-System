import React, { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import { FaUserMd, FaUsers } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [therapistCount, setTherapistCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:8810/echomind/api/admin/count-therapist");
        setTherapistCount(response.data.data || 0);
      } catch (error) {
        console.error("Error fetching therapist count:", error);
      }
    };
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8810/echomind/api/admin/count-patient");
        setPatientCount(response.data.data || 0);
      } catch (error) {
        console.error("Error fetching patient count:", error);
      }
    };
    fetchTherapists();
    fetchPatients();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="cards-container">
        <AdminCard
          icon={<FaUserMd />}
          description="Therapists"
          count={therapistCount}
        />
        <AdminCard
          icon={<FaUsers />}
          description="Patients"
          count={patientCount}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
