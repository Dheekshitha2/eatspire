import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('/api/ingredients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

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
      setIngredients([...ingredients, response.data]);
      setName('');
      setExpiryDate('');
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`/api/ingredients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  return (
    <div>
      <h2>Ingredient Management</h2>
      <form onSubmit={handleAddIngredient}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingredient Name"
          required
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <button type="submit">Add Ingredient</button>
      </form>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.expiry_date}
            <button onClick={() => handleDeleteIngredient(ingredient.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default IngredientManagement;
