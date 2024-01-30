import './App.css';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
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
          <Route path="/my-app" element={<Navigate to="/my-app/reservation" />} /> {/* Add a route to redirect to /reservation */}
          <Route path="/my-app/dashboard" element={<Dashboard />} />
          <Route path="/my-app/reservation" element={<BusLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
