import { createSlice } from "@reduxjs/toolkit";
import { updateBookingStatus } from "../actions/bookingActions";
import { Booking } from "@/types/turf";

interface BookingState {
  loading: boolean;
  error: string | null;
  updatedBooking: Booking | null;
}

const initialState: BookingState = {
  loading: false,
  error: null,
  updatedBooking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedBooking = action.payload;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
