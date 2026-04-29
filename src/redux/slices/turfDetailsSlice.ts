
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TurfData } from '@/types/turf';
import { fetchTurfById } from '../actions/turfActions';



interface TurfDetailsState {
  selectedTurf: TurfData | null;
  loading: boolean;
  error: string | null;
}

const initialState: TurfDetailsState = {
  selectedTurf: null,
  loading: false,
  error: null,
};

const turfDetailsSlice = createSlice({
  name: 'turfDetails',
  initialState,
  reducers: {
    clearTurfDetails(state) {
      state.selectedTurf = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTurfById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedTurf = null;
      })
      .addCase(fetchTurfById.fulfilled, (state, action: PayloadAction<TurfData>) => {
        state.loading = false;
        state.selectedTurf = action.payload;
      })
      .addCase(fetchTurfById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load turf details';
      });
  },
});

export const { clearTurfDetails } = turfDetailsSlice.actions;
export default turfDetailsSlice.reducer;
