import { Venue } from "@/redux/slices/user/venueSlice";
import { Booking } from "@/types/turf";
import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllVenues = createAsyncThunk<
  { allVenues: Venue[]; totalVenues: number; totalActiveVenues: number },
  { page: number; limit: number; search: string },
  { rejectValue: string }
>(
  "venuesUser/fetchAllVenues",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/getAllVenues?page=${page}&limit=${limit}&search=${search}`
      );
      console.log(response.data);
      return {
        allVenues: response.data.venues,
        totalVenues: response.data.totalVenues,
        totalActiveVenues: response.data.totalActiveVenues,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const fetchVenueById = createAsyncThunk<
  { turff: Venue },
  { turfId: string | undefined },
  { rejectValue: string }
>("venuesUser/fetchVenueById", async ({ turfId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/veunesById/${turfId}`);
    return { turff: data.data };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const bookVenue = createAsyncThunk<
  { booking: Booking },
  { date: string; turfId: string; startTime: string; endTime: string },
  { rejectValue: string }
>(
  "venuesUser/bookVenue",
  async ({ date, turfId, startTime, endTime }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/venue-booking`, {
        date,
        turfId,
        startTime,
        endTime,
      });
      return { booking: data.booking };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
