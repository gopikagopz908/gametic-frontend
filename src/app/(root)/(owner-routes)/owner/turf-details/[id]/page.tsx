
'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTurfById } from '@/redux/actions/turfActions';
// import { TurfData } from '@/types/turf';
import TurfImagesSlider from '@/components/owner/turfDetails/TurfImageSlider';
import TurfBasicInfo from '@/components/owner/turfDetails/TurfBasicInfo';
import TurfDescription from '@/components/owner/turfDetails/TurfDescription';
import TurfAvailability from '@/components/owner/turfDetails/TurfAvailability';
import TurfBookings from '@/components/owner/turfDetails/TurfBookings';
import TurfActions from '@/components/owner/turfDetails/TurfActions';
import BreadcrumbNav from '@/components/owner/turfDetails/BreadcrumbNav';

const TurfDetailsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const turfId = pathname.split('/').pop();

  const dispatch = useAppDispatch();
  const { selectedTurf, loading, error } = useAppSelector((state) => state.turfDetails);
  const user = useAppSelector(state => state.auth.user);

  React.useEffect(() => {
    if (turfId && typeof turfId === 'string') {
      dispatch(fetchTurfById(turfId));
    }
  }, [turfId, dispatch]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-10">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
      <button 
        onClick={() => router.push('/owner/turfs')} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to My Turfs
      </button>
    </div>
  );
  
  if (!selectedTurf) return (
    <div className="text-center mt-10">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto">
        <strong className="font-bold">Not Found!</strong>
        <span className="block sm:inline"> Turf not found.</span>
      </div>
      <button 
        onClick={() => router.push('/owner/turfs')} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to My Turfs
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <BreadcrumbNav username={user?.username} turfName={selectedTurf.name} /> */}
  
<div className="sticky top-0 z-10 bg-transparent px-4 pt-2 pb-4">
  <div className="w-fit bg-white text-blue-700 px-4 py-1 rounded shadow-sm border border-gray-200 text-center">
    <BreadcrumbNav username={user?.username} turfName={selectedTurf.name} />
  </div>
</div>



      <div className="flex flex-col lg:flex-row gap-8">
        <TurfImagesSlider images={selectedTurf.images} />
        
        <div className="lg:w-1/2">
          <TurfBasicInfo 
            name={selectedTurf.name}
            city={selectedTurf.city}
            area={selectedTurf.area}
            turfType={selectedTurf.turfType}
            size={selectedTurf.size}
            hourlyRate={selectedTurf.hourlyRate}
            averageRating={selectedTurf.averageRating}
            status={selectedTurf.status}
          />

          <TurfDescription description={selectedTurf.description} />
          
          <TurfAvailability availability={selectedTurf.availability} />
          
          <TurfBookings 
            bookings={selectedTurf.bookings || []} 
            turfId={selectedTurf._id} 
          />

          <TurfActions turfId={selectedTurf._id} />
        </div>
      </div>
    </div>
  );
};

export default TurfDetailsPage;