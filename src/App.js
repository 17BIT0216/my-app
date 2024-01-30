import React from 'react';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BusLayout from './BusLayout';
import Dashboard from './DashBoard';

const styles = {
  display: "flex",
};

const App = () => {
  return (
    <Router>
      <div style={styles}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="reservation" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservation" element={<BusLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
