import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/redux/slices/admin/userSlice";
import axiosErrorManager from "@/utils/axiosErrorManager";

export const fetchAllUser = createAsyncThunk<
  {
    allUsers: User[];
    totalUsers: number;
    totalBannedUsers: number;
    totalActiveUser: number;
  },
  { page: number; limit: number; search: string; role: string },
  { rejectValue: string }
>(
  "users/fetchAllUser",
  async ({ page, limit, search, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}`
      );
      console.log(response.data);
      return {
        allUsers: response.data.users,
        totalUsers: response.data.totalUsers,
        totalBannedUsers: response.data.totalBannedUsers,
        totalActiveUser: response.data.totalActiveUser,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const blockUser = createAsyncThunk<
  { user: User },
  { id: string },
  { rejectValue: string }
>("users/blockUser", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/admin/block-user/${id}`);
    return {
      user: response.data.user,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});
export const deleteUser = createAsyncThunk<
  { user: User },
  { id: string },
  { rejectValue: string }
>("users/deleteUser", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete-user/${id}`);
    return {
      user: response.data.user,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});
