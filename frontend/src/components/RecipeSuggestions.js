import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeSuggestions = () => {
  const [ingredients, setIngredients] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState('');

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.post(
        '/api/suggest-recipes',
        { ingredients: ingredients.split(',') },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuggestedRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipe suggestions:', error);
    }
  };

  return (
    <div>
      <h2>Recipe Suggestions</h2>
      <input
        type="text"
        value={ingredients}
        onChange={handleInputChange}
        placeholder="Enter ingredients separated by commas"
      />
      <button onClick={fetchSuggestions}>Get Suggestions</button>
      <div>
        <h3>Suggested Recipes:</h3>
        <p>{suggestedRecipes}</p>
      </div>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default RecipeSuggestions;
