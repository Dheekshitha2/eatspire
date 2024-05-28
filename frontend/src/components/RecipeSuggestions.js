import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeSuggestions = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  const fetchSuggestions = async () => {
    const ingredients = ['apple', 'banana', 'chocolate', 'milk']; // Adjust this to pull from your state or user input.

    try {
      const response = await axios.post(
        '/api/suggest-recipes',
        { ingredients }, // Send ingredients as part of the request body.
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-black">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center text-black">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Recipe</Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">eatspire</Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Login</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center mt-10 text-black">
        <h2 className="text-5xl font-bold mb-8">Recipe</h2>
        <button
          onClick={fetchSuggestions}
          className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 py-2 px-12 text-xl font-medium mt-2 outline-none focus:outline-none"
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
