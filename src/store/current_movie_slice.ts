import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchCurrentMovies } from "@/services/current_movie_service";

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

export const loadMovies = createAsyncThunk<
  Movie[],
  { baseUrl?: string; token?: string } | void
>("movies/load", async (args) => {
  const baseUrl = args?.baseUrl;
  const token = args?.token;

  const movies = await fetchCurrentMovies(baseUrl, token);
  return movies;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load upcoming movies";
      });
  },
});

export default moviesSlice.reducer;
