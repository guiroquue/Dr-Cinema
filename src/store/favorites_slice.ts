import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteMovie = {
  imdbId: string;
  title: string;
  poster?: string;
  year?: string;
  directors_abridged?: { name: string }[];
  actors_abridged?: { name: string }[];
  genres?: { Name: string }[];
  omdb?: { Rated: string }[];
  "release-dateIS"?: string;
  plot?: string;
};


type FavoritesState = {
  items: FavoriteMovie[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.items.some(m => m.imdbId === action.payload.imdbId);
      if (!exists) state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(m => m.imdbId !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<FavoriteMovie[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
