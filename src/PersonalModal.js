import React from 'react';

const PersonalInfoModal = ({ onClose, onSubmit }) => {
    // State for personal information
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        // Add more fields as needed
    });

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
                    <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    {/* Add more fields as needed */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoModal;
