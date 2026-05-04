import { fetchAllBookings } from "@/redux/actions/bookingActions";
import { createSlice } from "@reduxjs/toolkit";


interface AdminBookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const adminBookingSlice = createSlice({
  name: "adminBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminBookingSlice.reducer;