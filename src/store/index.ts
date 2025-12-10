// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites_slice";
import upcomingReducer from "./upcoming_movies_slice";
import movieDetailsReducer from "./upcoming_movie_details_slice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    upcoming: upcomingReducer,
    movieDetails: movieDetailsReducer,
    // add more slices here as you build them
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
