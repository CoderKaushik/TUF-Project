import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardForm = ({ card, onSave }) => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

   // Function to fetch the list of cards from the API
   const fetchCards = async () => {
    try {
      const response = await axios.get('https://tuf-project.onrender.com/api/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    if (card) {
      setFrontText(card.frontText);
      setBackText(card.backText);
    }
  }, [card]);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (card) {
        await axios.put(`https://tuf-project.onrender.com/api/cards/${card.id}`, { frontText, backText });
        fetchCards();
      } else {
        await axios.post('https://tuf-project.onrender.com/api/cards', { frontText, backText });
        fetchCards();
      }
      onSave();
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{card ? 'Edit Card' : 'Add New Card'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Front Text:</label>
          <input
            type="text"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Back Text:</label>
          <input
            type="text"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {card ? 'Update Card' : 'Add Card'}
        </button>
      </form>
    </div>
  );
};

export default CardForm;
