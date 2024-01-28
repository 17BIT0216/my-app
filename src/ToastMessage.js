import React, { useState } from 'react';
import './toastMessage.css';

const ToastMessage = ({ message, closeToast }) => {
    const [showToast, setShowToast] = useState(true);


    return (
        <div className={`toast ${showToast ? 'show' : ''}`}>
            <p>{message}</p>
            <button className="close-button" onClick={closeToast}>
                &times;
            </button>
        </div>
    );
};

export default ToastMessage;
