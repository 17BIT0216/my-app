import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="reservation" activeClassName="active">Reservation</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
