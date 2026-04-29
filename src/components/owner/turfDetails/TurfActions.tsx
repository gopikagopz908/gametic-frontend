import React from 'react';
import { useRouter } from 'next/navigation';

interface TurfActionsProps {
  turfId: string;
}

const TurfActions: React.FC<TurfActionsProps> = ({ turfId }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        onClick={() => router.push(`/owner/edit-turf/${turfId}`)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit Turf
      </button>
      <button
        onClick={() => router.push(`/owner/bookings/${turfId}`)}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition flex-1 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        View All Bookings
      </button>
    </div>
  );
};

export default TurfActions;