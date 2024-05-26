import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with', email, password);
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;
      console.log('Login successful, received token:', token);
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default Login;
