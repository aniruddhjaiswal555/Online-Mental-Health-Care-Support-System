import React from "react";
import "./AdminLayout.css";
import SidebarAdmin from "../components/SidebarAdmin";
import { Outlet } from "react-router-dom";
function AdminLayout() {
  return (
    <div className="layout">
      <SidebarAdmin />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
