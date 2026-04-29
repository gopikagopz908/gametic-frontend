

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTurf, fetchTurfs, updateTurf, deleteTurf } from '../actions/turfActions';
import { TurfData } from '@/types/turf';

interface TurfState {
  turfs: TurfData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  totalCount: number;
}

const initialState: TurfState = {
  turfs: [],
  loading: false,
  error: null,
  success: false,
  totalCount: 0,
};

const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {
    resetTurfState(state) {
      state.success = false;
      state.error = null;
    },
    //       // Optional: Add a reducer to manually set turfs if needed
    //   setTurfs(state, action: PayloadAction<{ turfs: TurfData[]; totalCount?: number }>) {
    //     state.turfs = action.payload.turfs;
    //     if (action.payload.totalCount !== undefined) {
    //       state.totalCount = action.payload.totalCount;
    //     }
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTurf.fulfilled, (state, action: PayloadAction<TurfData>) => {
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.turfs = [action.payload, ...state.turfs];
          state.totalCount += 1;
        }
      })
      .addCase(addTurf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add turf';
      })
      .addCase(fetchTurfs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurfs.fulfilled, (state, action) => {
        state.loading = false;
        state.turfs = action.payload.turfs;
        state.totalCount = action.payload.totalCount;
      })


      .addCase(fetchTurfs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch turfs';
      })

      .addCase(updateTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTurf.fulfilled, (state, action: PayloadAction<TurfData>) => {
        state.loading = false;
        state.success = true;

        if (!action.payload?._id) {
          console.error('UpdateTurf payload missing _id:', action.payload);
          return;
        }

        const index = state.turfs.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.turfs[index] = action.payload;
        }
      })
      .addCase(updateTurf.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload ?? 'Failed to update turf';
        state.error = action.payload as string || 'Failed to update turf';
      })


      .addCase(deleteTurf.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // .addCase(deleteTurf.fulfilled, (state, action) => {
      .addCase(deleteTurf.fulfilled, (state, action: PayloadAction<string>) => {
        console.log('shanu deleteTurf.fulfilled payload:', action.payload);
        state.loading = false;
        state.success = true;
        state.turfs = state.turfs.filter(t => t._id !== action.payload);
        state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteTurf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete turf';
      })
  },
});

export const { resetTurfState } = turfSlice.actions;
export default turfSlice.reducer;

