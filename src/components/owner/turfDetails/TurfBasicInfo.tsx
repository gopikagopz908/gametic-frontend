import React from 'react';
import { Rating } from '@smastrom/react-rating';
import { FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { MdOutlineSportsSoccer } from 'react-icons/md';

interface TurfBasicInfoProps {
  name: string;
  city: string;
  area: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  averageRating?: number;
  status?: string;
}

const Star = (
  <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 20.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7227 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.1635C12.2034 16.9599 11.7966 16.9599 11.4745 17.1635L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.27731 13.7483 7.1518 13.3614 6.86309 13.1166L3.39788 10.1778C2.71595 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" />
);

const TurfBasicInfo: React.FC<TurfBasicInfoProps> = ({
  name,
  city,
  area,
  turfType,
  size,
  hourlyRate,
  averageRating,
  status
}) => {
  const customStyles = {
    itemShapes: Star,
    activeFillColor: '#f59e0b',
    inactiveFillColor: '#d1d5db',
  };

  return (
    <div className="lg:w-1/2">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status ?? 'Unknown'}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
          <Rating
            style={{ maxWidth: 100 }}
            value={averageRating ?? 0}
            readOnly
            itemStyles={customStyles}
          />
          <span className="ml-2 font-medium text-gray-700">
            {averageRating?.toFixed(1) ?? '0.0'}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Pricing</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900 flex items-center">
            <FaRupeeSign className="mr-1" size={18} />
            {hourlyRate}
          </span>
          <span className="text-gray-500">per hour</span>
        </div>
      </div>

      {/* Turf Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Turf Details</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <IoIosFootball className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span><strong>Type:</strong> {turfType}</span>
          </li>
          <li className="flex items-start">
            <MdOutlineSportsSoccer className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span><strong>Size:</strong> {size}</span>
          </li>
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span><strong>Location:</strong> {area}, {city}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TurfBasicInfo;