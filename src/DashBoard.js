import React, { useState } from 'react';
import Modal from './Modal';
import './dashBoard.css'; // Import Dashboard CSS styles

const Dashboard = () => {
    const [passengers, setPassengers] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', seatNumber: 'A1', bookingDate: '2023-12-01' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 4, firstName: 'Jane', lastName: 'Smith', emaixl: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 5, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 6, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 7, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 8, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 9, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 10, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 11, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 12, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 13, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 14, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' },
        { id: 15, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', seatNumber: 'B2', bookingDate: '2023-12-02' }
    ]);
    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const openModal = (passenger) => {
        setSelectedPassenger(passenger);
    };

    const closeModal = () => {
        setSelectedPassenger(null);
    };

    const handleSave = (editedPassenger) => {
        const updatedPassengers = passengers.map(p => (p.id === editedPassenger.id ? editedPassenger : p));
        setPassengers(updatedPassengers);
        setSelectedPassenger(null); // Close modal after saving
    };

    const handleDelete = (passengerId) => {
        const updatedPassengers = passengers.filter(p => p.id !== passengerId);
        setPassengers(updatedPassengers);
        setSelectedPassenger(null); // Close modal after deleting
    };

    return (
        <div className="dashboard-container">
            <h2>Passenger Dashboard</h2>
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
                    {passengers.map(passenger => (
                        <tr key={passenger.id}>
                            <td>{passenger.firstName} {passenger.lastName}</td>
                            <td>{passenger.email}</td>
                            <td>{passenger.seatNumber}</td>
                            <td>{passenger.bookingDate}</td>
                            <td>
                                <button onClick={() => openModal(passenger)}>Edit</button>
                                <button onClick={() => handleDelete(passenger.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPassenger && (
                <Modal isOpen={true} closeModal={closeModal} passenger={selectedPassenger} onSave={handleSave} />
            )}
        </div>
    );
}

export default Dashboard;
