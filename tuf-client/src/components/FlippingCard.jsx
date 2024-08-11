import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const FlippingCard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='w-96 h-96 max-xl:h-auto flex flex-col justify-center items-center gap-8'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front Side of the Card */}
      <div  
        className="w-96 h-96 max-sm:w-80 max-sm:h-80 bg-gray-100 rounded-lg flex items-center justify-center shadow-md cursor-pointer">
        <h2 className="text-xl font-semibold text-gray-800">{frontText}</h2>
      </div>

      {/* Back Side of the Card */}
      <div  
        className="w-96 h-96 max-sm:w-80 max-sm:h-80 bg-blue-500 rounded-lg flex items-center justify-center shadow-md cursor-pointer">
        <h2 className="text-xl font-semibold text-white">{backText}</h2>
      </div>
    </ReactCardFlip>
    <button className='w-96 max-sm:w-80 p-4 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-center text-white rounded-xl' onClick={handleFlip}>Flip The Card</button>
    </div>
  );
};

export default FlippingCard;
