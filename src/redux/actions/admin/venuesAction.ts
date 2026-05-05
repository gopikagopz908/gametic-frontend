import { Venue } from "@/redux/slices/admin/venueSlice";
import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllVenues = createAsyncThunk<
  { allVenues: Venue[]; totalVenues: number; totalActiveVenues: number ,    totalBannedVenues: number; // ✅ add this
},
  { page: number; limit: number; search: string },
  { rejectValue: string }
>(
  "venues/fetchAllVenues",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/venues?page=${page}&limit=${limit}&search=${search}`
      );
      return {
        allVenues: response.data.venues,
        totalVenues: response.data.totalVenues,
        totalActiveVenues: response.data.totalActiveVenues,
            totalBannedVenues:  response.data.totalBannedVenues, // ✅ add this

      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
