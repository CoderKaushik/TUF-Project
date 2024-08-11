import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardForm from './CardForm'; // Import CardForm

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('https://tuf-project.onrender.com/api/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleSave = () => {
    fetchCards(); // Refetch the list of cards after adding or updating a card
    setSelectedCard(null); // Reset selected card after save
  };

  const handleEdit = (card) => {
    setSelectedCard(card);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tuf-project.onrender.com/api/cards/${id}`);
      fetchCards(); // Refetch the list of cards after deleting a card
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div>
      <CardForm card={selectedCard} onSave={handleSave} />
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
                  onClick={() => handleEdit(card)}
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
    </div>
  );
};

export default CardList;
