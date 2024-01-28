import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/reservation" element={<BusLayout />} />
                </Routes>
          </div>
      </Router>
  );
}

export default App;
