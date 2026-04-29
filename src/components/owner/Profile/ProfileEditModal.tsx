// "use client";

// import React, { useState ,useEffect} from 'react';
// import { X, Upload, Save } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/redux/store';
// import { updateUserProfile } from '@/redux/actions/profileActions';


// interface ProfileEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
 
// }

// interface ProfileFormData {
//   username: string;
//   email: string;
//   phone: string;
//   location: string;
//   bio: string;
//   businessName: string;
// }

// const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading ,error } = useSelector((state: RootState) => state.profile);

//    const reduxUser = useSelector((state: RootState) => state.auth.user);

// const [formData, setFormData] = useState<ProfileFormData>({
//     username: '',
//     email: '',
//     phone: '',
//     location: '',
//     bio: '',
//     businessName: ''
//   });

// useEffect(() => {
//   console.log('Current user in Redux,,,,,:', reduxUser);
// }, [reduxUser]);

// // Reset form when modal opens or user changes
//   useEffect(() => {
//     if (isOpen && reduxUser) {
//       setFormData({
//         username: reduxUser.username || '',
//         email: reduxUser.email || '',
//         // phone: reduxUser.phone || '',
//         phone: reduxUser.phone?.toString() || '',
//         location: reduxUser.location || '',
//         bio: reduxUser.bio || '',
//         businessName: reduxUser.businessName || '',
//       });
//     }
//   }, [isOpen, reduxUser]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   //  const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!reduxUser?.id || loading) return;

//   //    const dataToSend = {
//   //     ...formData,
//   //     phone: formData.phone ? Number(formData.phone) : undefined
//   //   };

//   //   try {
//   //     const res = await dispatch(updateUserProfile({ 
//   //       id: reduxUser.id, 
//   //       // formData 
//   //       formData: dataToSend
//   //     }));
      
//   //     if (updateUserProfile.fulfilled.match(res)) {
//   //       onClose();
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating profile:', error);
//   //   }
//   // };

//    const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!reduxUser?.id || loading) return;

//     try {
//       // Create the payload with correct types
//       const payload = {
//         id: reduxUser.id,
//         formData: {
//           username: formData.username,
//           email: formData.email,
//           ...(formData.phone && { phone: formData.phone }),
//           ...(formData.location && { location: formData.location }),
//           ...(formData.bio && { bio: formData.bio }),
//           ...(formData.businessName && { businessName: formData.businessName }),
//         }
//       };

//       const res = await dispatch(updateUserProfile(payload));
      
//       if (updateUserProfile.fulfilled.match(res)) {
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
//               Error: {error}
//             </div>
//           )}

//           {/* Profile Photo */}
//           <div className="flex items-center gap-6">
//             <div className="w-20 h-20 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center text-white text-xl font-bold">
//               {formData.username.charAt(0).toUpperCase() || 'O'}
//             </div>
//             <button
//               type="button"
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
//             >
//               <Upload size={16} />
//               Change Photo
//             </button>
//           </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 disabled
//               />
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
//                 Business Name
//               </label>
//               <input
//                 type="text"
//                 id="businessName"
//                 name="businessName"
//                 value={formData.businessName}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               placeholder="City, State, Country"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
//               Bio
//             </label>
//             <textarea
//              id="bio"
//               name="bio"
//               value={formData.bio}
//               onChange={handleInputChange}
//               rows={4}
//               placeholder="Tell us about your business..."
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//               ) : (
//                 <>
//                   <Save size={16} />
//                   Save Changes
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileEditModal



"use client";

import React, { useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState, AppDispatch } from '@/redux/store';
import { updateUserProfile } from '@/redux/actions/profileActions';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileFormData {
  username: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  businessName?: string;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      businessName: '',
    }
  });

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (isOpen && reduxUser) {
      reset({
        username: reduxUser.username || '',
        email: reduxUser.email || '',
        phone: reduxUser.phone || '',
        location: reduxUser.location || '',
        bio: reduxUser.bio || '',
        businessName: reduxUser.businessName || '',
      });
    }
  }, [isOpen, reduxUser, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!reduxUser?.id || loading) return;

    try {
      const payload = {
        id: reduxUser.id,
        formData: {
          username: data.username,
          email: data.email,
          ...(data.phone && { phone: data.phone }),
          ...(data.location && { location: data.location }),
          ...(data.bio && { bio: data.bio }),
          ...(data.businessName && { businessName: data.businessName }),
        }
      };

      const res = await dispatch(updateUserProfile(payload));
      
      if (updateUserProfile.fulfilled.match(res)) {
        onClose();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Profile Photo */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#415C41] to-[#00423D] rounded-full flex items-center justify-center text-white text-xl font-bold">
              {reduxUser?.username?.charAt(0).toUpperCase() || 'O'}
            </div>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Upload size={16} />
              Change Photo
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                disabled
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('phone', {
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('businessName')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, State, Country"
              {...register('location')}
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about your business..."
              {...register('bio', {
                maxLength: {
                  value: 500,
                  message: 'Bio cannot exceed 500 characters'
                }
              })}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;