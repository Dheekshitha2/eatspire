import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { name, email, password });
      navigate('/login'); // Redirect to login or other page
    } catch (error) {
      console.error('Error registering:', error);
    }
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
            className="input input-bordered w-3/4 mb-6 text-center"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-3/4 mb-6 text-center"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-3/4 mb-10 text-center"
            required
          />
          <button type="submit" className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 py-3 px-12 text-xl font-medium mt-2">
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
