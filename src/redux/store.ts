import { configureStore } from "@reduxjs/toolkit";
import turfReducer from "./slices/turfSlice";
import profileReducer from "./slices/profileSlices";
import bookingReducer from "./slices/bookingSlice";
import authReducer from "./slices/authantication/authanticationSlice";
import adminUserReducer from "./slices/admin/userSlice";
import adminVenueReducer from "./slices/admin/venueSlice";
import turfDetailsReducer from "./slices/turfDetailsSlice";
import hostReducer from "./slices/user/hostSlice";
import userVenueReducer from "./slices/user/venueSlice";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    turf: turfReducer,
    profile: profileReducer,
    booking: bookingReducer,
    adminUsers: adminUserReducer,
    adminVenues: adminVenueReducer,
    host: hostReducer,
    turfDetails: turfDetailsReducer,
    userVeune: userVenueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type AppStore = typeof store;
