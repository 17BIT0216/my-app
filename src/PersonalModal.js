import React from 'react';

const PersonalInfoModal = ({ onClose, onSubmit, selectedSeats }) => {
    // State for personal information
    const [formData, setFormData] = React.useState({
        id: generateId(), // Generate ID for the passenger
        firstName: '',
        lastName: '',
        email: '',
        seatNumber: selectedSeats,
        dateOfBooking: '',
    });

    // Function to generate a unique ID
    function generateId() {
        // Generate a random ID using current timestamp
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation and submission
        onSubmit(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    {/* Input fields for personal information */}
                    <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <input type="text" placeholder="Seat Number" value={selectedSeats} required />
                    <input type="date" placeholder="Date of Booking" value={formData.dateOfBooking} onChange={(e) => setFormData({ ...formData, dateOfBooking: e.target.value })} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoModal;
