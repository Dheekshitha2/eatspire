import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordError || emailError) {
      alert('Please correct the errors before submitting.');
      return;
    }
    try {
      const response = await axios.post('/api/register', { name, email, password });
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page on successful registration
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setEmailError('Email is already in use.'); // Set the email error if email is in use
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateEmail = (email) => {
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!password.match(/[A-Z]/)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!password.match(/[a-z]/)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!password.match(/[0-9]/)) {
      errors.push("Password must contain at least one number.");
    }
    if (!password.match(/[\^$*.\[\]{}()?\-"!@#%&/\\,><':;|_~`]/)) {
      errors.push("Password must contain at least one special character.");
    }
    setPasswordError(errors.join(' '));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Recipe</Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">eatspire</Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Login</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center mt-16">
        <h2 className="text-4xl font-bold mb-8">Register</h2>
        <form onSubmit={handleRegister} className="w-full max-w-md text-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input input-bordered w-full mb-4 bg-gray-200 text-center"
            required
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="input input-bordered w-full mb-4 bg-gray-200 text-center"
            required
          />
          {emailError && <div className="text-red-500 text-sm mb-4">{emailError}</div>}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="input input-bordered w-full mb-2 bg-gray-200 text-center"
            required
          />
          {passwordError && <div className="text-red-500 text-sm mb-4">{passwordError}</div>}
          <button type="submit" className="btn btn-primary rounded-2xl bg-orange-300 hover:bg-orange-400 py-2 px-36 text-xl font-medium mt-2">
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </main>
    </div>
  );
};

export default Register;
