import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/common/Login";
import Registration from "./Pages/therapist/Registration";
import Loginpage from "./Pages/therapist/Loginpage";
import Therapistdashboard from "./Pages/therapist/Therapistdashboard";
import Appointment from "./Pages/therapist/Appointment";
import Patient from "./Pages/therapist/Patient";
import LoginPatient from "./Pages/patient/LoginPatient";
import Signup from "./Pages/patient/Signup";
import PatientDashboard from "./Pages/patient/PatientDashboard";
import Messages from "./Pages/patient/Messages";
import LoginAdmin from "./Pages/admin/LoginAdmin";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import TherapistDashboard from "./Pages/therapist/Therapistdashboard";
import TherapistDashboardAdmin from "./Pages/admin/TherapistDashboardAdmin";
import Resource from "./Pages/admin/Resource";
import ResourceManage from "./Pages/admin/ResourceManage";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/UserContext"; 
import { TherapistProvider } from "./Context/TherapistContext";
function App() {
    return (
        <UserProvider>
            <TherapistProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Loginpage />} />
                        <Route path="/Appointment" element={<Appointment />} />
                        <Route path="/LoginPatient" element={<LoginPatient />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/Patient" element={<Patient />} />
                        <Route path="/Therapistdashboard" element={<Therapistdashboard />} />
                        <Route path="/LoginAdmin" element={<LoginAdmin></LoginAdmin>}></Route>
                         <Route element={<AdminLayout></AdminLayout>}>
                           <Route path="/admin-dashboard" element={<AdminDashboard></AdminDashboard>}></Route>
                           <Route path="/therapist-dashboard" element={<TherapistDashboardAdmin></TherapistDashboardAdmin>}></Route>
                           <Route path="/upload-resource" element={<Resource></Resource>}></Route>
                           <Route path="/manage-resource" element={<ResourceManage></ResourceManage>}></Route>
                         </Route>
                        <Route element={<MainLayout />}>
                            <Route path="/patient-dashboard" element={<PatientDashboard />} />
                            <Route path="/messages" element={<Messages />} />
                        </Route>
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
            </TherapistProvider>
        </UserProvider>
    );
}

export default App;
