import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        console.log('Fetching ingredients...');
        const response = await axios.get('/api/ingredients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Ingredients fetched:', response.data);
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.expiry_date}
            </li>
          ))
        ) : (
          <li>No ingredients found.</li>
        )}
      </ul>
      <nav>
        <ul>
          <li><Link to="/ingredients">Ingredient Management</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/recipes">Recipe Suggestions</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
