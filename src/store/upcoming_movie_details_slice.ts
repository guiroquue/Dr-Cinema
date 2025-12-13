import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchUpcomingMovieByImdb } from "@/services/upcoming_movie_details";

type MovieDetailsState = {
  item: Movie | null;
  loading: boolean;
  error: string | null;
};

const initialState: MovieDetailsState = {
  item: null,
  loading: false,
  error: null,
};

// Thunk: load movie details
export const upcomingLoadMovieDetails = createAsyncThunk<
  Movie,
  { imdbId: string; baseUrl?: string; token?: string }
>("movieDetails/load", async ({ imdbId, baseUrl, token }) => {
  return await fetchUpcomingMovieByImdb(imdbId, baseUrl, token);
});

const upcomingMovieDetailsSlice = createSlice({
  name: "upcomingMovieDetails",
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.item = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upcomingLoadMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.item = null;
      })
      .addCase(
        upcomingLoadMovieDetails.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.loading = false;
          state.item = action.payload;
        }
      )
      .addCase(upcomingLoadMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load movie details";
      });
  },
});

export const { clearMovieDetails } = upcomingMovieDetailsSlice.actions;

export default upcomingMovieDetailsSlice.reducer;
