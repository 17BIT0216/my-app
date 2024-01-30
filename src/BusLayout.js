import React, { useState, useEffect } from 'react';
import Modal from './BusModal.js';
import './busLayout.css';
import SeatStatusIndicators from './SeatStatusIndicators.js';
import PersonalInfoModal from './PersonalModal.js';
import ToastMessage from './ToastMessage.js';

const Reservation = () => {
    const [upperDeckSeats, setUpperDeckSeats] = useState(new Array(15).fill(false)); // Array to track upper deck seats
    const [lowerDeckSeats, setLowerDeckSeats] = useState(new Array(15).fill(false)); // Array to track lower deck seats
    const [bookedSeats, setBookedSeats] = useState({}); // Object to track booked seats
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const initializePreBookedSeats = () => {
        const initialBookedSeats = {};
        // Pre-booked seats: upper deck (rows 2, 4, 6) and lower deck (rows 1, 3, 5)
        for (let i = 1; i <= 15; i += 4) {
            initialBookedSeats[`upper-${i}`] = true;
        }
        for (let i = 0; i <= 14; i += 4) {
            initialBookedSeats[`lower-${i}`] = true;
        }
        
        // // Check if there are any previously booked seats in local storage
        const storedBookedSeats = localStorage.getItem('bookedSeat');
        if (storedBookedSeats) {
            const parsedBookedSeats = JSON.parse(storedBookedSeats);
            // Merge the previously booked seats with the pre-booked seats
            Object.assign(initialBookedSeats, parsedBookedSeats);
        }
    
        setBookedSeats(initialBookedSeats);
    };
    

    // Initialize pre-booked seats when component is rendered
    useEffect(() => {
        initializePreBookedSeats();
    }, []);

    const handleSeatSelection = (deck, seatIndex) => {
        // Check if the seat is already booked
        if (bookedSeats[`${deck}-${seatIndex}`]) {
            return; // Return early if the seat is booked
        }
    
        // Check if the seat is already selected
        const seatKey = `${deck}-${seatIndex}`;
        if (selectedSeats.includes(seatKey)) {
            // If the seat is already selected, remove it from selectedSeats
            const updatedSelectedSeats = selectedSeats.filter(seat => seat !== seatKey);
            setSelectedSeats(updatedSelectedSeats);
        } else {
            // If the seat is not selected, add it to selectedSeats
            setSelectedSeats([...selectedSeats, seatKey]);
        }
    
        // Update the seat status in the respective deck
        if (deck === 'upper') {
            const updatedSeats = [...upperDeckSeats];
            updatedSeats[seatIndex] = !updatedSeats[seatIndex];
            setUpperDeckSeats(updatedSeats);
        } else if (deck === 'lower') {
            const updatedSeats = [...lowerDeckSeats];
            updatedSeats[seatIndex] = !updatedSeats[seatIndex];
            setLowerDeckSeats(updatedSeats);
        }
    };
    
    // Function to book selected seats and open modal
const bookSelectedSeats = () => {
    if (selectedSeats.length > 0) {
        setShowModal(true);
    } else {
        alert('Please select at least one seat.'); 
    }
};


    // Function to close modal and reset selected seats
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSeats([]);
    };

    // Function to handle booking seats
    const handleBookSeats = () => {
        setShowPersonalModal(true);
        setShowModal(false);
    };

    // Function to handle personal info submission
    const handlePersonalInfoSubmit = (formData) => {
        // Retrieve existing data from local storage
        const existingData = localStorage.getItem('userInfo');
        
        // Parse existing data or initialize an empty array if no data exists
        const userData = existingData ? JSON.parse(existingData) : [];
    
        // Append the new form data to the existing array
        userData.push(formData);
    
        // Store updated data in local storage
        localStorage.setItem('userInfo', JSON.stringify(userData));
    
        setShowPersonalModal(false); // Close personal info modal
        setShowModal(false);
        setShowToast(true); // Show toast message
    };
    

    const closeToast = () => {
                // Create a copy of the current bookedSeats object
                const updatedBookedSeats = { ...bookedSeats };
                selectedSeats.forEach(seat => {
                    updatedBookedSeats[seat] = true;
                });
                setBookedSeats(updatedBookedSeats);
                localStorage.setItem('bookedSeat',JSON.stringify(updatedBookedSeats));
                setSelectedSeats([]);
        setShowToast(false);
    };

    return (
        <div>
            <div className="bus-layout">
                <h2 className="bus-head">Bus Layout and Reservation</h2>
                <div><h3 className="deck-header">Click on an Available seat to proceed with your transaction.</h3></div>
                <SeatStatusIndicators />
                <div className="upper-deck">
                    <h3>Upper Deck</h3>
                    <div className="seats">
                        {upperDeckSeats.map((seat, index) => (
                            <div
                                key={`upper-seat-${index}`}
                                className={`seat ${seat ? 'selected' : bookedSeats[`upper-${index}`] ? 'booked' : ''} ${selectedSeats.includes(`upper-${index}`) ? 'preselected' : ''}`}
                                onClick={() => handleSeatSelection('upper', index)}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="lower-deck">
                    <h3>Lower Deck</h3>
                    <div className="seats">
                        {lowerDeckSeats.map((seat, index) => (
                            <div
                                key={`lower-seat-${index}`}
                                className={`seat ${seat ? 'selected' : bookedSeats[`lower-${index}`] ? 'booked' : ''} ${selectedSeats.includes(`lower-${index}`) ? 'preselected' : ''}`}
                                onClick={() => handleSeatSelection('lower', index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <button className="book-seats" onClick={bookSelectedSeats}>Book Selected Seats</button>
            </div>

            <div>
                <Modal showModal={showModal} selectedSeats={selectedSeats} handleCloseModal={handleCloseModal} handleBookSeats={handleBookSeats} />
                {showPersonalModal && (
                    <PersonalInfoModal selectedSeats={selectedSeats} onClose={() => { setShowPersonalModal(false); setShowModal(false) }} onSubmit={handlePersonalInfoSubmit} />
                )}
                {showToast && <ToastMessage message="Congrats! Bus ticket booked." closeToast={closeToast} />}
            </div>
        </div>
    );
}

export default Reservation;
