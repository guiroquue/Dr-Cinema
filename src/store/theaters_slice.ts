import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theater } from "@/types/theatre";
import { fetchTheaters as fetchTheatersService, fetchTheaterById as fetchTheaterByIdService } from "@/services/theaters_service";

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

const toId = (t: Theater) => String((t as any).id ?? (t as any)._id ?? "");

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

export const fetchTheaterById = createAsyncThunk<
  Theater,
  { theaterId: string } & FetchOpts,
  { rejectValue: { theaterId: string; message: string } }
>("theaters/fetchTheaterById", async ({ theaterId, baseUrl, token }, { rejectWithValue }) => {
  try {
    return await fetchTheaterByIdService(theaterId, baseUrl, token);
  } catch (err) {
    return rejectWithValue({ theaterId, message: errMsg(err, "Failed to fetch theater") });
  }
});

const theatersSlice = createSlice({
  name: "theaters",
  initialState,
  reducers: {
    clearTheatersError(state) {
      state.error = null;
    },
    clearTheaterByIdError(state, action: PayloadAction<string>) {
      state.errorById[action.payload] = null;
    },
    setTheaters(state, action: PayloadAction<Theater[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchTheaters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheaters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTheaters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch theaters";
      })

      // by id
      .addCase(fetchTheaterById.pending, (state, action) => {
        const id = action.meta.arg.theaterId;
        state.loadingById[id] = true;
        state.errorById[id] = null;
      })
      .addCase(fetchTheaterById.fulfilled, (state, action) => {
        const theater = action.payload;
        const id = toId(theater);
        if (id) state.byId[id] = theater;
        state.loadingById[action.meta.arg.theaterId] = false; // ensure flag resets
      })
      .addCase(fetchTheaterById.rejected, (state, action) => {
        const p = action.payload;
        const id = p?.theaterId ?? action.meta.arg.theaterId;
        state.loadingById[id] = false;
        state.errorById[id] = p?.message ?? "Failed to fetch theater";
      });
  },
});

export const { clearTheatersError, clearTheaterByIdError, setTheaters } = theatersSlice.actions;
export default theatersSlice.reducer;
