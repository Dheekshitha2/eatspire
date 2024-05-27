import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIngredientForm from './EditIngredientForm';

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

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
        { name: selectedIngredient.name, expiry_date: selectedIngredient.expiry_date },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setIngredients([...ingredients, response.data]);
      setSelectedIngredient(null);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleUpdateIngredient = (updatedIngredient) => {
    setIngredients(ingredients.map(ingredient => ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient));
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-black">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center text-black">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">
            Recipe
          </Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">
            eatspire
          </Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center mt-10 text-black">
        <h2 className="text-5xl font-bold mb-8">Ingredients</h2>
        <ul className="list-disc pl-5 mt-8 w-full max-w-md">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li key={ingredient.id} className="mb-2 flex justify-between items-center">
                <span>{ingredient.name} - {ingredient.expiry_date}</span>
                <button
                  onClick={() => setSelectedIngredient(ingredient)}
                  className="btn btn-secondary rounded-2xl bg-gray-300 hover:bg-gray-400 py-1 px-4 text-sm font-medium"
                >
                  &#x2022;&#x2022;&#x2022;
                </button>
              </li>
            ))
          ) : (
            <li>No ingredients found.</li>
          )}
        </ul>
        {selectedIngredient && (
          <EditIngredientForm
            ingredient={selectedIngredient}
            onClose={() => setSelectedIngredient(null)}
            onUpdate={handleUpdateIngredient}
            onDelete={handleDeleteIngredient}
          />
        )}
      </main>
    </div>
  );
};

export default IngredientManagement;
