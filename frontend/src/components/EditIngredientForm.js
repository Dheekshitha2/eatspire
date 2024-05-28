import React, { useState } from 'react';
import axios from 'axios';

const EditIngredientForm = ({ ingredient, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(ingredient.name);
  const [expiryDate, setExpiryDate] = useState(ingredient.expiry_date);

  const handleUpdateIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/ingredients/${ingredient.id}`,
        { name, expiry_date: expiryDate },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  const handleDeleteIngredient = async () => {
    try {
      await axios.delete(`/api/ingredients/${ingredient.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onDelete(ingredient.id);
      onClose();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-12 rounded-2xl shadow-lg">
        <h3 className="text-3xl text-center font-bold mb-8 text-black">Edit Ingredient</h3>
        <form onSubmit={handleUpdateIngredient} className="w-full max-w-md text-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingredient"
            className="input input-bordered w-full mb-6 text-center bg-gray-200"
            required
          />
          <input
            id="expiry-date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="input input-bordered w-full mb-10 text-center bg-gray-200"
            required
          />
          <div className="flex justify-between space-x-4 mb-4">
            <button type="button" onClick={handleDeleteIngredient} className="btn btn-secondary rounded-lg bg-red-400 hover:bg-red-600 py-2 text-lg font-bold w-full">
              Delete
            </button>
          </div>
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

export default EditIngredientForm;
