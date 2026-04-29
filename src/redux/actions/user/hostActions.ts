import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axiosErrorManager from "@/utils/axiosErrorManager";
import { Match } from "@/redux/slices/user/hostSlice";
import { Turf } from "@/app/(root)/(user-routes)/home/facilities/page";
interface FetchMatchesArgs {
  page: number;
  limit: number;
  search: string;
}

interface FetchMatchesResponse {
  matches: Match[];
}
interface HostMatch {
  title: string;
  sports: string;
  maxPlayers: number;
  turfId: string;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM (24-hour)
  endTime: string; // Format: HH:MM (24-hour)
  paymentPerPerson: number;
}

export const fetchAllMatches = createAsyncThunk<
  FetchMatchesResponse,
  FetchMatchesArgs,
  { rejectValue: string }
>(
  "host/fetchAllMatches",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/all-matches?page=${page}&limit=${limit}&search=${search}`
      );
      const matches: Match[] = data.matches;
      return { matches };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

export const fetchMatchById = createAsyncThunk<
  { match: Match },
  { matchId: string | undefined },
  { rejectValue: string }
>("host/fetchMatchById", async ({ matchId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/match/${matchId}`);
    return { match: data.match };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const hostGame = createAsyncThunk<
  { match: Match },
  { hostData: HostMatch },
  { rejectValue: string }
>("hostGame/host", async (hostData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/host-match", hostData);
    return response.data.match;
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const joinGame = createAsyncThunk<
  { match: Match },
  { matchId: string | undefined },
  { rejectValue: string }
>("joinGame/host", async ({matchId}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`join-match/${matchId}`);
    return response.data.match;
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const fetchVenueBySport = createAsyncThunk<
  { venues: Turf[] },
  { sport: string },
  { rejectValue: string }
>("host/fetchVenueBySport", async ({ sport }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(
      `/turfby-sport?sportType=${sport}`
    );
    return { venues: data.data };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});
