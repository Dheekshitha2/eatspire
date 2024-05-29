import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIngredientForm from './AddIngredientForm';

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const handleAddIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const sortedIngredients = React.useMemo(() => {
    let sortableIngredients = [...ingredients];
    if (sortConfig !== null) {
      sortableIngredients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableIngredients;
  }, [ingredients, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortClass = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? 'sorted' : 'sorted-desc';
    }
    return '';
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
        <h2 className="text-5xl font-bold mb-8">Dashboard</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary rounded-2xl bg-gray-300 hover:bg-orange-400 mb-4 py-2 px-16 text-xl font-normal mt-1"
        >
          Add Ingredient
        </button>

        <Link
          to="/ingredients"
          className="btn btn-primary rounded-2xl bg-gray-300 hover:bg-orange-400 mb-6 py-2 px-10 text-xl font-normal border-none"
        >
          Manage Ingredients
        </Link>

        {isModalOpen && (
          <div className="modal-overlay">
            <AddIngredientForm onClose={() => setIsModalOpen(false)} onAdd={handleAddIngredient} />
          </div>
        )}

        <div className="w-full max-w-3xl mt-6 mb-8">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className={`px-4 py-2 border-b-2 text-xl relative ${getSortClass('name')}`}>
                  <button
                    type="button"
                    onClick={() => requestSort('name')}
                    className="flex items-center focus:outline-none relative"
                  >
                    Ingredient
                    <span className="ml-2 sort-icon"></span>
                    <span className={`sort-up ${getSortClass('name') === 'sorted' ? 'visible' : 'hidden'}`}></span>
                    <span className={`sort-down ${getSortClass('name') === 'sorted-desc' ? 'visible' : 'hidden'}`}></span>
                  </button>
                </th>
                <th className={`px-4 py-2 border-b-2 text-xl relative ${getSortClass('expiry_date')}`}>
                  <button
                    type="button"
                    onClick={() => requestSort('expiry_date')}
                    className="flex items-center focus:outline-none relative"
                  >
                    Expiry Date
                    <span className="ml-2 sort-icon"></span>
                    <span className={`sort-up ${getSortClass('expiry_date') === 'sorted' ? 'visible' : 'hidden'}`}></span>
                    <span className={`sort-down ${getSortClass('expiry_date') === 'sorted-desc' ? 'visible' : 'hidden'}`}></span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedIngredients.length > 0 ? (
                sortedIngredients.map((ingredient) => (
                  <tr key={ingredient.id} className="hover:bg-gray-200">
                    <td className="border px-4 py-2">{ingredient.name}</td>
                    <td className="border px-4 py-2">{ingredient.expiry_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">No ingredients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
