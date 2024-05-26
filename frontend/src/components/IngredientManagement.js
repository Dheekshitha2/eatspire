import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Recipe</Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">eatspire</Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Login</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center mt-16">
        <h2 className="text-5xl font-bold mb-8">Ingredient Management</h2>
        <form onSubmit={handleAddIngredient} className="w-full max-w-md text-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingredient Name"
            className="input input-bordered w-3/4 mb-6 text-center"
            required
          />
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="input input-bordered w-3/4 mb-10 text-center"
            required
          />
          <button type="submit" className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 py-3 px-12 text-xl font-medium mt-2">
            Add Ingredient
          </button>
        </form>
        <ul className="list-disc pl-5 mt-8">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li key={ingredient.id} className="mb-2 flex justify-between items-center">
                <span>{ingredient.name} - {ingredient.expiry_date}</span>
                <button 
                  onClick={() => handleDeleteIngredient(ingredient.id)}
                  className="btn btn-secondary rounded-2xl bg-red-400 hover:bg-red-600 py-1 px-4 text-sm font-medium"
                >
                  Delete
                </button>
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

export default IngredientManagement;
