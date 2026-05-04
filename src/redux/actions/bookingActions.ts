import axiosErrorManager from "@/utils/axiosErrorManager";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async (
    { bookingId, status }: { bookingId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/owner/update-booking-status/${bookingId}`,
        { status }
      );
      return response.data.updatedBooking; 
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);


export const fetchAllBookings = createAsyncThunk(
  "admin/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/admin/bookings");
      return data.bookings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);