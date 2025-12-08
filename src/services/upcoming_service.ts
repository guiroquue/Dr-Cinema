import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "./api";
import type { Movie } from "@/types/movie";

type MoviesState = {
  upcoming: Movie[];
  loadingUpcoming: boolean;
  upcomingError: string | null;
};

const initialState: MoviesState = {
  upcoming: [],
  loadingUpcoming: false,
  upcomingError: null,
};

export const fetchUpcoming = createAsyncThunk<
  Movie[],
  { baseUrl?: string; token?: string } | undefined,
  { rejectValue: string }
>("movies/fetchUpcoming", async (arg, { rejectWithValue }) => {
  try {
    const { baseUrl, token } = arg ?? {};
    return (await apiGet("/upcoming", baseUrl, token)) as Movie[];
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch upcoming movies");
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearUpcomingError(state) {
      state.upcomingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcoming.pending, (state) => {
        state.loadingUpcoming = true;
        state.upcomingError = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loadingUpcoming = false;
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loadingUpcoming = false;
        state.upcomingError = action.payload ?? "Failed to fetch upcoming movies";
      });
  },
});

export const { clearUpcomingError } = moviesSlice.actions;
export default moviesSlice.reducer;
