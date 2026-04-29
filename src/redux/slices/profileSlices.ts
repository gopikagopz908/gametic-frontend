import { updateUserProfile } from '../actions/profileActions';
import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface ProfileState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
         state.error = action.payload as string;
        state.success = false;
      });
  },
});

const persistConfig = {
  key: 'profile',
  storage,
  whitelist: ['success'], // Only persist success state if needed
};

export const { resetProfileState } = profileSlice.actions;
export default persistReducer(persistConfig, profileSlice.reducer);