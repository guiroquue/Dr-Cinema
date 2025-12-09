// src/store/upcomingSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchUpcoming } from "@/services/upcoming_movies_service";

type UpcomingState = {
  items: Movie[];
  loading: boolean;
  error: string | null;
};

const initialState: UpcomingState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk – this is what you dispatch from your views
export const loadUpcoming = createAsyncThunk<
  Movie[],
  { baseUrl?: string; token?: string } | void
>("upcoming/load", async (args) => {
  const baseUrl = args?.baseUrl;
  const token = args?.token;

  const movies = await fetchUpcoming(baseUrl, token);
  return movies;
});

const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUpcoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadUpcoming.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(loadUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load upcoming movies";
      });
  },
});

export default upcomingSlice.reducer;
