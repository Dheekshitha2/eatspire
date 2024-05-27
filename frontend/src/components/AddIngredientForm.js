import React, { useState } from 'react';
import axios from 'axios';

const AddIngredientForm = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/ingredients',
        { name, expiry_date: expiryDate },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      onAdd(response.data);
      setName('');
      setExpiryDate('');
      onClose();
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-12 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-8 text-black">Add Ingredient</h3>
        <form onSubmit={handleAddIngredient} className="w-full max-w-md text-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingredient"
            className="input input-bordered w-full mb-6 text-center"
            required
          />
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="input input-bordered w-full mb-10 text-center"
            required
          />
          <div className="flex justify-between space-x-4">
            <button type="submit" className="btn btn-primary rounded-lg bg-orange-400 hover:bg-orange-600 py-2 text-lg font-bold w-1/2">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary rounded-lg bg-gray-300 hover:bg-gray-400 py-2 text-lg font-bold w-1/2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIngredientForm;
