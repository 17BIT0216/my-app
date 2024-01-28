import React from 'react';
import './busModal.css';

const Modal = ({ showModal, selectedSeats, handleCloseModal, handleBookSeats }) => {
    return (
        showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <h2>Confirm Booking</h2>
                    <p>You are about to book the following seats:</p>
                    <ul>
                        {selectedSeats.map(seat => (
                            <li key={seat}>{seat}</li>
                        ))}
                    </ul>
                    <button onClick={handleCloseModal}>Cancel</button>
                    <button onClick={handleBookSeats}>Book Seats</button>
                </div>
            </div>
        )
    );
}

export default Modal;
