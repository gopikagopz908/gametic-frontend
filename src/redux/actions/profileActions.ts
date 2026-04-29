import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { User } from '@/types/authantication';
import axiosErrorManager from '@/utils/axiosErrorManager';
import { updateAuthUser } from '@/redux/slices/authantication/authanticationSlice';

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ id, formData }: { id: string; formData: Partial<User> }, { dispatch, rejectWithValue }) => {
    try {
      console.log("id,formData.......",id,formData)
      const response = await axiosInstance.put(`/users/${id}`, formData);
      console.log("response from updateUserProfile",response)
      const updatedUser = response.data.user || response.data;
      dispatch(updateAuthUser(updatedUser)); 
      return updatedUser;
    } catch (error) {
      console.log("error from updateUserProfile",error)
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);