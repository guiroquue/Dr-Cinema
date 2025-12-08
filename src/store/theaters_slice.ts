import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theater } from "@/types/theatre";
import {
  fetchTheaters as fetchTheatersService,
  fetchTheaterById as fetchTheaterByIdService,
} from "@/services/theaters_service"; // adjust path/name

type TheatersState = {
  items: Theater[];
  loading: boolean;
  error: string | null;

  byId: Record<string, Theater | undefined>;
  loadingById: Record<string, boolean | undefined>;
  errorById: Record<string, string | null | undefined>;
};

const initialState: TheatersState = {
  items: [],
  loading: false,
  error: null,

  byId: {},
  loadingById: {},
  errorById: {},
};

export const fetchTheaters = createAsyncThunk<
  Theater[],
  { baseUrl?: string; token?: string } | undefined,
  { rejectValue: string }
>("theaters/fetchTheaters", async (arg, { rejectWithValue }) => {
  try {
    const { baseUrl, token } = arg ?? {};
    return await fetchTheatersService(baseUrl, token);
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Failed to fetch theaters");
  }
});

export const fetchTheaterById = createAsyncThunk<
  Theater,
  { theaterId: string; baseUrl?: string; token?: string },
  { rejectValue: { theaterId: string; message: string } }
>("theaters/fetchTheaterById", async ({ theaterId, baseUrl, token }, { rejectWithValue }) => {
  try {
    return await fetchTheaterByIdService(theaterId, baseUrl, token);
  } catch (err: any) {
    return rejectWithValue({
      theaterId,
      message: err?.message ?? "Failed to fetch theater",
    });
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

      .addCase(fetchTheaterById.pending, (state, action) => {
        const id = action.meta.arg.theaterId;
        state.loadingById[id] = true;
        state.errorById[id] = null;
      })
      .addCase(fetchTheaterById.fulfilled, (state, action) => {
        const theater = action.payload;
        const id = (theater as any).id ?? (theater as any)._id;
        if (id != null) state.byId[String(id)] = theater;
      })
      .addCase(fetchTheaterById.rejected, (state, action) => {
        const payload = action.payload;
        if (payload) {
          state.loadingById[payload.theaterId] = false;
          state.errorById[payload.theaterId] = payload.message;
        }
      });
  },
});

export const { clearTheatersError, setTheaters } = theatersSlice.actions;
export default theatersSlice.reducer;
