import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './dashBoard.css'; // Import Dashboard CSS styles

const Dashboard = () => {
    const [passengers, setPassengers] = useState([]);
    const [selectedPassenger, setSelectedPassenger] = useState(null);

    useEffect(() => {
        // Retrieve user information from local storage
        const userData = localStorage.getItem('userInfo');

        // Parse user information if available
        if (userData) {
            const parsedData = JSON.parse(userData);
            setPassengers(parsedData); // Update passengers state with the array of objects
        }
    }, []);

    const openModal = (passenger) => {
        setSelectedPassenger(passenger);
    };

    const closeModal = () => {
        setSelectedPassenger(null);
    };

    const handleSave = (editedPassenger) => {
        // No need to save changes in local storage for now
        setSelectedPassenger(null); // Close modal after saving
    };

    const handleDelete = (delPassenger) => {
        const bookedSeats = JSON.parse(localStorage.getItem('bookedSeat')) || {};
        const deletedSeats = delPassenger.seatNumber;
        deletedSeats.forEach(seat => {
            if (bookedSeats.hasOwnProperty(seat)) {
                delete bookedSeats[seat];
            }
        });
        localStorage.setItem('bookedSeat', JSON.stringify(bookedSeats));
        const updatedPassengers = passengers.filter(passenger => passenger.id !== delPassenger.id);
        setPassengers(updatedPassengers);
        localStorage.setItem('userInfo', JSON.stringify(updatedPassengers));
    
        setSelectedPassenger(null);
    };
    

    return (
        <div className="dashboard-container">
            <h2>Passenger Dashboard</h2>
            {passengers.length === 0 ? ( // Conditionally render message if passengers array is empty
                <div className="no-passengers-message">
                    <p>No passengers data available.</p>
                </div>
            ) : (
                <table className="passenger-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Seat Number</th>
                            <th>Date of Booking</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger, index) => (
                            <tr key={index}>
                                <td>{passenger.firstName} {passenger.lastName}</td>
                                <td>{passenger.email}</td>
                                <td>{passenger.seatNumber}</td>
                                <td>{passenger.dateOfBooking}</td>
                                <td>
                                    <button onClick={() => openModal(passenger)}>Edit</button>
                                    <button onClick={()=>{handleDelete(passenger)}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedPassenger && (
                <Modal isOpen={true} closeModal={closeModal} passenger={selectedPassenger} onSave={handleSave} />
            )}
        </div>
    );
}

export default Dashboard;
