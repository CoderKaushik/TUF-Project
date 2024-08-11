import React, { useState } from 'react';
import CardForm from '../components/CardForm';
import CardList from '../components/CardList';

const AdminPanel = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEdit = (card) => {
    setSelectedCard(card);
  };

  const handleSave = () => {
    setSelectedCard(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <CardList onEdit={handleEdit} />
      <CardForm card={selectedCard} onSave={handleSave} />
    </div>
  );
};

export default AdminPanel;
