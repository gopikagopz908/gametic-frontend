import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import {
  AuthResponse,
  LoginData,
  RegisterData,
} from "../../../types/authantication";

export const registerUser = createAsyncThunk<AuthResponse, RegisterData>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "hoobaa");
      const response = await axiosInstance.post<AuthResponse>(
        "/register",
        data
      );
      console.log(response.data, "bnm,");
      return response.data;
    } catch (error) {
      console.log(error, "log");
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginData>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>("/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential: string, { rejectWithValue }) => {
    try {
      console.log(credential);
      const response = await axiosInstance.post("/auth/google", { credential });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
export const emailCheck = createAsyncThunk<AuthResponse, RegisterData>(
  "auth/emailcheck",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data, "fghjjhg");

      const response = await axiosInstance.post<AuthResponse>(
        "/emailverification",
        data
      );

      return response.data;
    } catch (error) {
      console.log(error, "log");
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const emailverification = createAsyncThunk<
  AuthResponse,
  { email: string; otp: string }
>("auth/emailverification", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/verifyotp", data);
    return response.data;
  } catch (error) {
    console.log(error);

    return rejectWithValue(axiosErrorManager(error));
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
