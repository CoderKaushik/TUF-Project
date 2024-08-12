import React, { useState, useEffect } from 'react';
import CardForm from '../components/CardForm';
import CardList from '../components/CardList';
import axios from 'axios';

const AdminPanel = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEdit = (card) => {
    setSelectedCard(card);
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get('https://tuf-project.onrender.com/api/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSave = () => {
    setSelectedCard(null);
    fetchCards();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <CardList onEdit={handleEdit} />
      <CardForm card={selectedCard} onSave={handleSave} />
    </div>
  );
};

export default AdminPanel;
