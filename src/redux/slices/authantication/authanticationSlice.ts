import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  emailCheck,
  emailverification,
  googleLogin,
  loginUser,
  logout,
  registerUser,
} from "../../actions/authantication/authanticationAction";
import { AuthResponse, User } from "../../../types/authantication";
import { persistReducer } from "redux-persist";
import { loginAdmin } from "@/redux/actions/admin/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
  isAuth: boolean;
  role: "user" | "admin" | "owner";
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
  isAuth: false,
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    updateAuthUser(state, action: PayloadAction<User>) {
    state.user = {
    ...state.user, // Keep existing fields
    ...action.payload // Override with updated fields
  };

  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        emailCheck.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(emailCheck.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuth = true;
          state.role = action.payload.user.role;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          console.log(action.payload.user);
          console.log(action.payload.user.id);
          state.isAuth = true;
          state.role = action.payload.user.role;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAdmin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          console.log(action.payload.user);
          state.isAuth = true;
          state.role = "admin";
        }
      )
      .addCase(loginAdmin.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log(action.payload.user);
        state.isAuth = true;
        state.role = "user";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(emailverification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isVerified = false;
      })
      .addCase(emailverification.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isVerified = true;
      })
      .addCase(
        emailverification.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
          state.isVerified = false;
        }
      )
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuth = false;
        state.role = "user";
      })
      .addCase(logout.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuth", "role"],
};

export const { clearError,updateAuthUser  } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
