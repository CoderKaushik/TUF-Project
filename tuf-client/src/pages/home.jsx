import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlippingCard from '../components/FlippingCard';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 1;

  useEffect(() => {
    // Fetch cards from the server
    const fetchCards = async () => {
        try {
          const response = await axios.get('https://tuf-project.onrender.com/api/cards');
          setCards(response.data);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };
      

    fetchCards();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(cards.length / cardsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage) || [];

  return (
    <div className="w-screen h-screen max-xl:h-screen bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 flex flex-col">
      <div className="w-full h-[90%] justify-center items-center flex max-xl:flex-col">
        {currentCards.map((card) => (
          <div 
            key={card.id} // Unique key for each card instance
            className="w-full h-full max-xl:w-full max-xl:h-auto  p-2 flex justify-center items-center"
          >
            <FlippingCard 
              frontText={card.frontText} 
              backText={card.backText} 
              cardId={card.id} // Pass a unique identifier to the FlippingCard component
            />
          </div>
        ))}
      </div>
      <div className="w-full h-[10%] max-xl:h-[5rem]  flex justify-between items-center p-4">
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 0} 
          className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentPage >= Math.ceil(cards.length / cardsPerPage) - 1} 
          className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
