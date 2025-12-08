import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";

import { fetchUpcoming as fetchUpcomingService } from "@/services/upcoming_service";

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
    return await fetchUpcomingService(baseUrl, token);
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

    // optional: if you ever fetch upcoming elsewhere and just want to store it
    setUpcoming(state, action: PayloadAction<Movie[]>) {
      state.upcoming = action.payload;
      state.upcomingError = null;
      state.loadingUpcoming = false;
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

export const { clearUpcomingError, setUpcoming } = moviesSlice.actions;
export default moviesSlice.reducer;
