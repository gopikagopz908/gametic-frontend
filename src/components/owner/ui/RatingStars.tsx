
import React from 'react';
import { FiStar } from 'react-icons/fi';

const RatingStars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FiStar key={`full-${i}`} className="text-yellow-400" size={size} fill="currentColor" />
      ))}
      {hasHalfStar && (
        <div className="relative" style={{ width: size, height: size }}>
          <FiStar className="text-gray-300" size={size} fill="currentColor" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%', height: size }}>
            <FiStar className="text-yellow-400" size={size} fill="currentColor" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FiStar key={`empty-${i}`} className="text-gray-300" size={size} />
      ))}
    </div>
  );
};

export default RatingStars;