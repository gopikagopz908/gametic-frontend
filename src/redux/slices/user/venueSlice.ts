import {
  bookVenue,
  fetchAllVenues,
  fetchVenueById,
} from "@/redux/actions/user/venueAction";
import { Booking } from "@/types/turf";
import { createSlice } from "@reduxjs/toolkit";

export interface Venue {
  _id: string;
  ownerId: string;
  name: string;
  city: string;
  area: string;
  location: string;
  turfType: string;
  size: string;
  images: string[];
  hourlyRate: number;
  status: string;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
    timeSlots: string[];
  };
  isDelete: boolean;
  averageRating: number;
  ratings: {
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
  }[];
  bookings: {
    _id: string;
    userId: string;
    date: string;
    slot: {
      start: string;
      end: string;
    };
    status: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bookedSlot: {
    date: string;
    slots: {
      start: string;
      end: string;
      _id: string;
    }[];
    _id: string;
  }[];
}

interface VenueState {
  venues: Venue[];
  totalVenues: number;
  booking: Booking | null;
  totalActiveVenues: number;
  venue: Venue | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: VenueState = {
  venues: [],
  venue: null,
  booking: null,
  totalVenues: 0,
  totalActiveVenues: 0,
  loading: false,
  error: null,
};

const venueSliceUser = createSlice({
  name: "venuesUser",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVenues.pending, (state) => {
        state.loading = true;
        console.log(state.loading);
      })
      .addCase(fetchAllVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload.allVenues;
        state.totalVenues = action.payload.totalVenues;
        state.totalActiveVenues = action.payload.totalActiveVenues;
      })
      .addCase(fetchAllVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something wrong";
      })
      .addCase(fetchVenueById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.loading = false;
        state.venue = action.payload.turff;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something wrong";
      })
      .addCase(bookVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.booking;
      })
      .addCase(bookVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something wrong";
      });
  },
});

export default venueSliceUser.reducer;
