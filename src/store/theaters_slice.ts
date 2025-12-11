import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theater } from "@/types/theatre";
import { fetchTheaters as fetchTheatersService } from "@/services/theaters_service";

type FetchOpts = { baseUrl?: string; token?: string };

type TheatersState = {
  items: Theater[];
  loading: boolean;
  error: string | null;

  byId: Record<string, Theater>;
  loadingById: Record<string, boolean>;
  errorById: Record<string, string | null>;
};

const initialState: TheatersState = {
  items: [],
  loading: false,
  error: null,
  byId: {},
  loadingById: {},
  errorById: {},
};

const errMsg = (err: unknown, fallback: string) =>
  err instanceof Error ? err.message : fallback;

const indexById = (items: Theater[]): Record<string, Theater> => {
  const map: Record<string, Theater> = {};
  for (const t of items) {
    map[String(t.id)] = t;
  }
  return map;
};

export const fetchTheaters = createAsyncThunk<
  Theater[],
  FetchOpts | undefined,
  { rejectValue: string }
>("theaters/fetchTheaters", async (opts, { rejectWithValue }) => {
  try {
    const { baseUrl, token } = opts ?? {};
    return await fetchTheatersService(baseUrl, token);
  } catch (err) {
    return rejectWithValue(errMsg(err, "Failed to fetch theaters"));
  }
});

const theatersSlice = createSlice({
  name: "theaters",
  initialState,
  reducers: {
    clearTheatersError(state) {
      state.error = null;
    },
    setTheaters(state, action: PayloadAction<Theater[]>) {
      state.items = action.payload;
      state.byId = indexById(action.payload);
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheaters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheaters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.byId = indexById(action.payload);
      })
      .addCase(fetchTheaters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch theaters";
      });
  },
});

export const { clearTheatersError, setTheaters } = theatersSlice.actions;
export default theatersSlice.reducer;
