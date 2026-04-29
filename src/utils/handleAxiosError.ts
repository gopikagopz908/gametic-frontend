import axios from 'axios';

export const handleAxiosError = (
  error: unknown,
  rejectWithValue: (value: string) => unknown
) => {
  if (axios.isAxiosError(error)) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
  return rejectWithValue('An unexpected error occurred');
};
