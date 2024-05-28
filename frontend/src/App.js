import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import IngredientManagement from './components/IngredientManagement';
import RecipeSuggestions from './components/RecipeSuggestions';

// Simulated function to check if the user is authenticated
function isAuthenticated() {
  // This should be replaced with actual authentication check
  return localStorage.getItem('token');
}

// Route guard component
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ingredients" element={<IngredientManagement />} />
          <Route path="/recipes" element={<RecipeSuggestions />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
