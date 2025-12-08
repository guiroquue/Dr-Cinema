import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types/movie";
import { fetchUpcoming as fetchUpcomingService } from "@/services/upcoming_service";

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

export const fetchUpcoming = createAsyncThunk<
  Movie[],
  { baseUrl?: string; token?: string } | undefined,
  { rejectValue: string }
>("upcoming/fetchUpcoming", async (arg, { rejectWithValue }) => {
  try {
    const { baseUrl, token } = arg ?? {};
    return await fetchUpcomingService(baseUrl, token);
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch upcoming movies");
  }
});

const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    clearUpcomingError(state) {
      state.error = null;
    },
    setUpcoming(state, action: PayloadAction<Movie[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch upcoming movies";
      });
  },
});

export const { clearUpcomingError, setUpcoming } = upcomingSlice.actions;
export default upcomingSlice.reducer;
