import React from "react";
import "./AdminCard.css";
import { motion } from "framer-motion";

const AdminCard = ({ icon, description, count }) => {
  return (
    <motion.div
      className="info-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <div className="icon-container">{icon}</div>
      <div className="card-details">
        <h2 className="card-description">{description}</h2>
        <h3 className="card-total">Total: {count}</h3> {/* Change to 'count' */}
      </div>
    </motion.div>
  );
};

export default AdminCard;
