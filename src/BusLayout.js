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

    // Function to initialize pre-booked seats
    const initializePreBookedSeats = () => {
        const initialBookedSeats = {};
        // Pre-booked seats: upper deck (rows 2, 4, 6) and lower deck (rows 1, 3, 5)
        for (let i = 1; i <= 15; i += 4) {
            initialBookedSeats[`upper-${i}`] = true;
        }
        for (let i = 0; i <= 14; i += 4) {
            initialBookedSeats[`lower-${i}`] = true;
        }
        setBookedSeats(initialBookedSeats);
    };

    // Initialize pre-booked seats when component is rendered
    useEffect(() => {
        initializePreBookedSeats();
    }, []);

    // Function to handle seat selection
    const handleSeatSelection = (deck, seatIndex) => {
        // Check if the seat is already booked or selected
        if (bookedSeats[`${deck}-${seatIndex}`] || selectedSeats.includes(`${deck}-${seatIndex}`)) {
            return; // Return early if the seat is booked or selected
        }

        // Select the seat
        if (deck === 'upper') {
            const updatedSeats = [...upperDeckSeats];
            updatedSeats[seatIndex] = !updatedSeats[seatIndex];
            setUpperDeckSeats(updatedSeats);
        } else if (deck === 'lower') {
            const updatedSeats = [...lowerDeckSeats];
            updatedSeats[seatIndex] = !updatedSeats[seatIndex];
            setLowerDeckSeats(updatedSeats);
        }

        // Update selected seats
        setSelectedSeats([...selectedSeats, `${deck}-${seatIndex}`]);
    };

    // Function to book selected seats and open modal
    const bookSelectedSeats = () => {
        if (selectedSeats.length > 0) {
            setShowModal(true); // Update showModal state to open the modal
        } else {
            alert('Please select at least one seat.'); // Alert user if no seats are selected
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
        // Store data in local storage
        localStorage.setItem('userInfo', JSON.stringify(formData));
        setShowPersonalModal(false); // Close personal info modal
        setShowModal(false);
        setShowToast(true); // Show toast message
    };

    const closeToast = () => {
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
                    <PersonalInfoModal onClose={() => { setShowPersonalModal(false); setShowModal(false) }} onSubmit={handlePersonalInfoSubmit} />
                )}
                {showToast && <ToastMessage message="Congrats! Bus ticket booked." closeToast={closeToast} />}
            </div>
        </div>
    );
}

export default Reservation;
