import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchMovieByImdbId as fetchMovieByImdbIdService } from "@/services/movies_service";

type MovieDetailsState = {
  byImdbId: Record<string, Movie | undefined>;
  loadingByImdbId: Record<string, boolean | undefined>;
  errorByImdbId: Record<string, string | null | undefined>;
};

const initialState: MovieDetailsState = {
  byImdbId: {},
  loadingByImdbId: {},
  errorByImdbId: {},
};

export const fetchMovieByImdbId = createAsyncThunk<
  { imdbId: string; movie: Movie },
  { imdbId: string; baseUrl?: string; token?: string },
  { rejectValue: { imdbId: string; message: string } }
>("movieDetails/fetchByImdbId", async ({ imdbId, baseUrl, token }, { rejectWithValue }) => {
  try {
    const movie = await fetchMovieByImdbIdService(imdbId, baseUrl, token);
    return { imdbId, movie };
  } catch (err: any) {
    return rejectWithValue({
      imdbId,
      message: err?.message ?? "Failed to fetch movie details",
    });
  }
});

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    clearMovieDetailsError(state, action: { payload: { imdbId: string } }) {
      state.errorByImdbId[action.payload.imdbId] = null;
    },
    clearMovieDetails(state, action: { payload: { imdbId: string } }) {
      const { imdbId } = action.payload;
      delete state.byImdbId[imdbId];
      delete state.loadingByImdbId[imdbId];
      delete state.errorByImdbId[imdbId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieByImdbId.pending, (state, action) => {
        const { imdbId } = action.meta.arg;
        state.loadingByImdbId[imdbId] = true;
        state.errorByImdbId[imdbId] = null;
      })
      .addCase(fetchMovieByImdbId.fulfilled, (state, action) => {
        const { imdbId, movie } = action.payload;
        state.loadingByImdbId[imdbId] = false;
        state.byImdbId[imdbId] = movie;
      })
      .addCase(fetchMovieByImdbId.rejected, (state, action) => {
        const payload = action.payload;
        if (!payload) return;
        state.loadingByImdbId[payload.imdbId] = false;
        state.errorByImdbId[payload.imdbId] = payload.message;
      });
  },
});

export const { clearMovieDetailsError, clearMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
