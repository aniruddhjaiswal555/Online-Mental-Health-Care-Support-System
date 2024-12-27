import React from "react";
import './MessageBox.css'; 
const MessageBox = ({ message }) => {
    return (
        <div className="message-box">
            <div className="message-header">

            </div>
            <p><strong>{message}</strong></p>
        </div>
    );
};

export default MessageBox;
