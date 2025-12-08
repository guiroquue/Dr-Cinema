import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchMovies as fetchMoviesService } from "@/services/movies_service";

type CurrentMoviesState = {
  items: Movie[];
  loading: boolean;
  error: string | null;
};

const initialState: CurrentMoviesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCurrentMovies = createAsyncThunk<
  Movie[],
  { baseUrl?: string; token?: string } | undefined,
  { rejectValue: string }
>("currentMovies/fetchCurrentMovies", async (arg, { rejectWithValue }) => {
  try {
    const { baseUrl, token } = arg ?? {};
    return await fetchMoviesService(baseUrl, token);
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch current movies");
  }
});

const currentMoviesSlice = createSlice({
  name: "currentMovies",
  initialState,
  reducers: {
    clearCurrentMoviesError(state) {
      state.error = null;
    },
    setCurrentMovies(state, action: PayloadAction<Movie[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCurrentMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch current movies";
      });
  },
});

export const { clearCurrentMoviesError, setCurrentMovies } = currentMoviesSlice.actions;
export default currentMoviesSlice.reducer;
