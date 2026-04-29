import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import {
  AuthResponse,
  LoginData,
} from "../../../types/authantication";


export const loginAdmin = createAsyncThunk<AuthResponse, LoginData>(
  "auth/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/admin/login",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);