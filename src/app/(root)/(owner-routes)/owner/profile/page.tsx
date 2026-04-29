// "use client";

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {  
//   Edit3, 
//   Settings, 
//   MapPin, 
//   Calendar, 
//   TrendingUp,
//   Mail,
//   Building,
//   DollarSign
// } from 'lucide-react';
// import ProfileEditModal from '@/components/owner/Profile/ProfileEditModal';
// import StatsCard from '@/components/owner/Profile/StatsCard';
// import QuickActions from '@/components/owner/Profile/QuickActions';
// import { RootState, AppDispatch } from '@/redux/store';
// import { fetchTurfs } from '@/redux/actions/turfActions';

// interface OwnerStats {
//   totalTurfs: number;
//   totalBookings: number;
//   monthlyRevenue: number;
//   activeBookings: number;
// }

// const Profile: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
//   const { turfs, loading: turfLoading } = useSelector((state: RootState) => state.turf);
  
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [ownerStats, setOwnerStats] = useState<OwnerStats>({
//     totalTurfs: 0,
//     totalBookings: 0,
//     monthlyRevenue: 0,
//     activeBookings: 0
//   });

//   // Fetch turfs when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       dispatch(fetchTurfs(user.id));
//     }
//   }, [dispatch, user?.id]);

//   // Calculate stats from turfs data
//   useEffect(() => {
//     if (turfs && turfs.length > 0) {
//       const totalTurfs = turfs.length;
//       const allBookings = turfs.flatMap(turf => turf.bookings || []);
//       const totalBookings = allBookings.length;
      
//       // Calculate monthly revenue (current month)
//       const currentMonth = new Date().getMonth();
//       const currentYear = new Date().getFullYear();
//       const monthlyBookings = allBookings.filter(booking => {
//         const bookingDate = new Date(booking.date);
//         return bookingDate.getMonth() === currentMonth && 
//                bookingDate.getFullYear() === currentYear &&
//                booking.paymentStatus === 'paid';
//       });
//       const monthlyRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.amount, 0);
      
//       // Calculate active bookings (confirmed and not completed)
//       const activeBookings = allBookings.filter(booking => 
//         booking.status === 'confirmed' || booking.status === 'pending'
//       ).length;

//       setOwnerStats({
//         totalTurfs,
//         totalBookings,
//         monthlyRevenue,
//         activeBookings
//       });
//     }
//   }, [turfs]);

//   const loading = authLoading || turfLoading;

//   // Redirect to login if not authenticated
//   if (!user && !authLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
//           <p className="text-gray-500 mb-6">You need to be logged in to access this page</p>
//           <button
//             onClick={() => window.location.href = '/'}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex items-center gap-6">
//               {/* Profile Avatar */}
//               <div className="relative">
//                 <div className="w-24 h-24 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                   {user?.username?.charAt(0).toUpperCase() || 'O'}
//                 </div>
//                 <button 
//                   onClick={() => setIsEditModalOpen(true)}
//                   className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
//                 >
//                   <Edit3 size={14} />
//                 </button>
//               </div>

//               {/* Profile Info */}
//               <div className="space-y-2">
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {user?.username || 'Owner Name'}
//                 </h1>
//                 <p className="text-gray-600 flex items-center gap-2">
//                   <Mail size={16} />
//                   {user?.email}
//                 </p>
//                 <div className="flex items-center gap-4 text-sm text-gray-500">
//                   <span className="flex items-center gap-1">
//                     <Building size={14} />
//                     Sports Facility Owner
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MapPin size={14} />
//                     Location: City, State
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsEditModalOpen(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//               >
//                 <Edit3 size={16} />
//                 Edit Profile
//               </button>
//               <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
//                 <Settings size={16} />
//                 Settings
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatsCard
//             title="Total Turfs"
//             value={ownerStats.totalTurfs}
//             icon={<Building className="text-blue-600" size={24} />}
//             trend={`${ownerStats.totalTurfs > 0 ? '+' : ''}${ownerStats.totalTurfs} active`}
//             trendType="positive"
//           />
//           <StatsCard
//             title="Total Bookings"
//             value={ownerStats.totalBookings}
//             icon={<Calendar className="text-green-600" size={24} />}
//             trend={`${ownerStats.activeBookings} active bookings`}
//             trendType="positive"
//           />
//           <StatsCard
//             title="Monthly Revenue"
//             value={`₹${ownerStats.monthlyRevenue.toLocaleString()}`}
//             icon={<DollarSign className="text-purple-600" size={24} />}
//             trend="Current month"
//             trendType="neutral"
//           />
//           <StatsCard
//             title="Active Bookings"
//             value={ownerStats.activeBookings}
//             icon={<TrendingUp className="text-orange-600" size={24} />}
//             trend="Pending & confirmed"
//             trendType="neutral"
//           />
//         </div>

//         {/* Quick Actions */}
//         <QuickActions />

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
//           <div className="space-y-4">
//             {turfs && turfs.length > 0 ? (
//               turfs.slice(0, 3).flatMap((turf, turfIndex) => 
//                 turf.bookings?.slice(0, 2).map((booking, bookingIndex) => (
//                   <div key={`${turfIndex}-${bookingIndex}`} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                     <div className={`w-3 h-3 rounded-full mt-2 ${
//                       booking.status === 'confirmed' ? 'bg-green-500' :
//                       booking.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
//                     }`}></div>
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">
//                         {booking.status === 'confirmed' ? 'Booking Confirmed' : 
//                          booking.status === 'pending' ? 'New Booking Request' : 'Booking Updated'}
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         {turf.name} - {booking.userId?.name} - ₹{booking.amount}
//                       </p>
//                       <p className="text-gray-400 text-xs mt-1">
//                         {new Date(booking.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ).slice(0, 5)
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 <p>No recent activity found</p>
//                 <p className="text-sm">Start by adding turfs to see activity here</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Edit Modal */}
//         <ProfileEditModal 
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           user={user}
//         />
//       </div>
//     </div>
//   );
// };

// export default Profile;



"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  
  Edit3, 
  Settings, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Mail,
  Building,
  DollarSign
} from 'lucide-react';
import ProfileEditModal from '@/components/owner/Profile/ProfileEditModal';
import StatsCard from '@/components/owner/Profile/StatsCard';
import QuickActions from '@/components/owner/Profile/QuickActions';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTurfs } from '@/redux/actions/turfActions';

interface OwnerStats {
  totalTurfs: number;
  totalBookings: number;
  monthlyRevenue: number;
  activeBookings: number;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { turfs, loading: turfLoading } = useSelector((state: RootState) => state.turf);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ownerStats, setOwnerStats] = useState<OwnerStats>({
    totalTurfs: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    activeBookings: 0
  });

  // useEffect(() => {
  //   console.log("hi habeeee")
  //   if (user?.id) {
  //     console.log(user.id,"user.id")
  //     dispatch(fetchTurfs(user?.id));
  //   }
  // }, [dispatch, user?.id]);

  useEffect(() => {
  const loadTurfs = async () => {
    try {
      if (user?.id) {
        await dispatch(fetchTurfs({ ownerId: user.id }));
      }
    } catch (error) {
      console.error("Failed to fetch turfs:", error);//toast 
    }
  };
  loadTurfs();
}, [dispatch, user?.id]);


  useEffect(() => {
    if (turfs && turfs.length > 0) {
      const totalTurfs = turfs.length;
      const allBookings = turfs.flatMap(turf => turf.bookings || []);
      const totalBookings = allBookings.length;
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyBookings = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.getMonth() === currentMonth && 
               bookingDate.getFullYear() === currentYear &&
               booking.paymentStatus === 'paid';
      });
      const monthlyRevenue = monthlyBookings.reduce((sum, booking) => sum + booking.amount, 0);
      
      const activeBookings = allBookings.filter(booking => 
        booking.status === 'confirmed' || booking.status === 'pending'
      ).length;

      setOwnerStats({
        totalTurfs,
        totalBookings,
        monthlyRevenue,
        activeBookings
      });
    }
  }, [turfs]);

  const loading = authLoading || turfLoading;

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-500 mb-6">You need to be logged in to access this page</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'O'}
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={14} />
                </button>
              </div>

              {/* Profile Info */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.username || 'Owner Name'}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail size={16} />
                  {user?.email}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Building size={14} />
                    {user?.businessName || 'Sports Facility Owner'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {user?.location || 'Location not specified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Turfs"
            value={ownerStats.totalTurfs}
            icon={<Building className="text-blue-600" size={24} />}
            trend={`${ownerStats.totalTurfs > 0 ? '+' : ''}${ownerStats.totalTurfs} active`}
            trendType="positive"
          />
          <StatsCard
            title="Total Bookings"
            value={ownerStats.totalBookings}
            icon={<Calendar className="text-green-600" size={24} />}
            trend={`${ownerStats.activeBookings} active bookings`}
            trendType="positive"
          />
          <StatsCard
            title="Monthly Revenue"
            value={`₹${ownerStats.monthlyRevenue.toLocaleString()}`}
            icon={<DollarSign className="text-purple-600" size={24} />}
            trend="Current month"
            trendType="neutral"
          />
          <StatsCard
            title="Active Bookings"
            value={ownerStats.activeBookings}
            icon={<TrendingUp className="text-orange-600" size={24} />}
            trend="Pending & confirmed"
            trendType="neutral"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {turfs && turfs.length > 0 ? (
              turfs.slice(0, 3).flatMap((turf, turfIndex) => 
                turf.bookings?.slice(0, 2).map((booking, bookingIndex) => (
                  <div key={`${turfIndex}-${bookingIndex}`} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      booking.status === 'confirmed' ? 'bg-green-500' :
                      booking.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {booking.status === 'confirmed' ? 'Booking Confirmed' : 
                         booking.status === 'pending' ? 'New Booking Request' : 'Booking Updated'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {turf.name} - {booking.userId?.name} - ₹{booking.amount}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ).slice(0, 5)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity found</p>
                <p className="text-sm">Start by adding turfs to see activity here</p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Edit Modal */}
        <ProfileEditModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          // user={user}
        />
      </div>
    </div>
  );
};

export default Profile;