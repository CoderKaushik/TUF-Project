import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardList = ({ onEdit }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cards/${id}`);
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Card List</h2>
      <ul className="space-y-2">
        {cards.map(card => (
          <li
            key={card.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white"
          >
            <div>
              <div className="font-semibold">{card.frontText}</div>
              <div className="text-gray-600">{card.backText}</div>
            </div>
            <div>
              <button
                onClick={() => onEdit(card)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
