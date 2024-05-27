import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIngredientForm from './AddIngredientForm';

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-black">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center text-black">
          <Link to="/recipesuggestions" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">
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

      <main className="flex-grow flex flex-col items-center mt-16 text-black">
        <h2 className="text-5xl font-bold mb-8">Dashboard</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 mb-4 py-2 px-16 text-xl font-medium mt-2 outline-none focus:outline-none"
        >
          Add Ingredient
        </button>

        <Link
          to="/ingredient"
          className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 mb-8 py-2 px-10 text-xl font-medium outline-none focus:outline-none"
        >
          Manage Ingredients
        </Link>

        {isModalOpen && <AddIngredientForm onClose={() => setIsModalOpen(false)} onAdd={handleAddIngredient} />}

        <ul className="list-disc pl-5">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li key={ingredient.id} className="mb-2">
                {ingredient.name} - {ingredient.expiry_date}
              </li>
            ))
          ) : (
            <li>No ingredients found.</li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
