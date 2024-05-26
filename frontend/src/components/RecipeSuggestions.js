import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RecipeSuggestions = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async () => {
    try {
      const response = await axios.post(
        '/api/suggest-recipes',
        {},
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Recipe</Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">eatspire</Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Login</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center mt-16">
        <h2 className="text-5xl font-bold mb-8">Recipe</h2>
        <button 
          onClick={fetchSuggestions}
          className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 py-3 px-12 text-xl font-medium mt-2"
        >
          Generate
        </button>
        <ul className="list-disc pl-5 mt-8">
          {suggestedRecipes.length > 0 ? (
            suggestedRecipes.map((recipe, index) => (
              <li key={index} className="mb-2">{recipe}</li>
            ))
          ) : (
            <li>No suggestions found.</li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default RecipeSuggestions;
