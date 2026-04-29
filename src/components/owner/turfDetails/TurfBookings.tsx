import React from 'react';
import { useRouter } from 'next/navigation';
import { Booking } from '@/types/turf';

interface TurfBookingsProps {
  bookings: Booking[];
  turfId: string;
}

const TurfBookings: React.FC<TurfBookingsProps> = ({ bookings, turfId }) => {
  const router = useRouter();
  const upcomingBookings = bookings?.filter(booking => new Date(booking.date) >= new Date()) || [];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Bookings</h3>
      {upcomingBookings.length > 0 ? (
        <div className="space-y-3">
          {upcomingBookings.slice(0, 3).map((booking, index) => (
            <div 
              key={booking._id || `${booking.date}-${index}`}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-blue-600 font-medium">
                  {booking.startTime} - {booking.endTime}
                </span>
                <span className="text-gray-700">
                  ₹{booking.amount}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <div>Booked by: {booking.userId?.name || 'Guest'}</div>
                <div>Payment: 
                  <span className={`ml-1 ${
                    booking.paymentStatus === 'paid' ? 'text-green-600' :
                    booking.paymentStatus === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Created: {new Date(booking.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {upcomingBookings.length > 3 && (
            <button 
              onClick={() => router.push(`/owner/bookings/${turfId}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
            >
              View all {upcomingBookings.length} bookings →
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">No upcoming bookings</p>
        </div>
      )}
    </div>
  );
};

export default TurfBookings;