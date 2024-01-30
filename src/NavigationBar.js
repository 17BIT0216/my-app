import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink exact to="/my-app/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/my-app/reservation" activeClassName="active">Reservation</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
