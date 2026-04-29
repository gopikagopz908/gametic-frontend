import React from 'react';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

interface TravelCardProps {
  id?: string;
  imageUrl?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  title?: string;
  price?: number;
  currency?: string;
}

const TravelCard: React.FC<TravelCardProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  location = "Los Angeles, USA",
  rating = 5.00,
  reviewCount = 309,
  duration = "4 Nights - 4 Days",
  title = "Mystic Marvels: Uncover Hidden Legends and Lore",
  price = 256.00,
  currency = "$"
}) => {
  return (
    <div className="w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-1">
      {/* Image Container */}
      <div className="relative rounded-2xl">
        <Image 
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full h-64 object-cover rounded-lg  "
        />
      </div>
      
      {/* Content Container */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center text-[#98916d] text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        
        {/* Rating and Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {rating.toFixed(2)} ({reviewCount})
            </span>
          </div>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-tight">
          {title}
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">From:</span>
          <div className="flex items-baseline mr-5">
            <span className="text-2xl font-bold text-[#98916d]">
              {currency}{price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ Per Person</span>
          </div>
        </div>
        

      </div>
    </div>
  );
};

// Demo Component
const TravelCardDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <TravelCard />
    </div>
  );
};

export default TravelCardDemo;