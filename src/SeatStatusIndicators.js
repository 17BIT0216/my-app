import React from 'react';
import './seatStatusIndicators.css'; // Import CSS styles for SeatStatusIndicators

const SeatStatusIndicators = () => {
    return (
        <div className="status-indicators">
            <div className="status-box">
                <div className="status-color booked"></div>
                <span>Pre-booked </span>
            </div>
            <div className="status-box">
                <div className="status-color selected"></div>
                <span>Selected </span>
            </div>
            <div className="status-box">
                <div className="status-color preselected"></div>
                <span>Available </span>
            </div>
        </div>
    );
}

export default SeatStatusIndicators;
