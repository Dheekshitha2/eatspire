import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
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
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    // Nav bar
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/recipes" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Recipe</Link>
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">eatspire</Link>
          <Link to="/login" className="btn btn-ghost rounded-lg hover:bg-gray-300 py-2 px-4 text-lg">Login</Link>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center mt-16">
        <h2 className="text-5xl font-bold mb-8">Dashboard</h2>
        
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary rounded-2xl bg-orange-400 hover:bg-orange-600 mb-8 py-3 px-16 text-xl font-medium mt-2"
        >
          Add Ingredient
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-12 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-8">Add Ingredient</h3>
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
                  <button type="submit" className="btn btn-primary rounded-lg bg-orange-400 hover:bg-orange-600 py-2 px-16 text-lg font-medium">
                    Save
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="btn btn-secondary rounded-lg bg-gray-300 hover:bg-gray-400 py-2 px-14 text-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
