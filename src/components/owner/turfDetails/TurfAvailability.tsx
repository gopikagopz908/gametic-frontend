import React from 'react';
import { FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import { TurfData } from '@/types/turf';

interface TurfAvailabilityProps {
  availability: TurfData['availability'];
}

const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ availability }) => {
  if (!availability) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500">No availability information available</p>
        </div>
      </div>
    );
  }

  if (typeof availability === 'string') {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{availability}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Availability</h2>
      
      {/* Days of Week */}
      <div className="mb-5">
        <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Available Days
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                availability.days.includes(day)
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Operating Hours */}
      <div className="mb-5">
        <h3 className="text-md font-medium mb-3 text-gray-700 flex items-center">
          <FaClock className="mr-2 text-blue-500" />
          Operating Hours
        </h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="font-medium">Daily:</span>
            <span className="text-blue-700 font-semibold">
              {availability.startTime} - {availability.endTime}
            </span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {availability.timeSlots !== undefined && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-md font-medium mb-2 text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2 text-yellow-500" />
            Booking Options
          </h3>
          <p className="text-sm text-gray-600">
            {Array.isArray(availability.timeSlots)
              ? `Available slots: ${availability.timeSlots.join(', ')}`
              : 'Flexible booking available'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TurfAvailability;