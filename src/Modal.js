// Modal.js

import React, { useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, closeModal, passenger, onSave }) => {
    console.log(isOpen);
    const [editedPassenger, setEditedPassenger] = useState({ ...passenger });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPassenger(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editedPassenger);
        closeModal();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Edit Passenger Details</h2>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={editedPassenger.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={editedPassenger.lastName} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={editedPassenger.email} onChange={handleChange} />
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
