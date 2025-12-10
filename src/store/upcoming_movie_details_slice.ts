import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchMovieByImdb } from "@/services/upcoming_movie_details";

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
export const loadMovieDetails = createAsyncThunk<
  Movie,
  { imdbId: string; baseUrl?: string; token?: string }
>("movieDetails/load", async ({ imdbId, baseUrl, token }) => {
  return await fetchMovieByImdb(imdbId, baseUrl, token);
});

const movieDetailsSlice = createSlice({
  name: "movieDetails",
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
      .addCase(loadMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.item = null;
      })
      .addCase(
        loadMovieDetails.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.loading = false;
          state.item = action.payload;
        }
      )
      .addCase(loadMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load movie details";
      });
  },
});

export const { clearMovieDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
