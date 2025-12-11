// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites_slice";
import upcomingReducer from "./upcoming_movies_slice";
import movieDetailsReducer from "./upcoming_movie_details_slice";
import moviesReducer from "./current_movie_slice";
import TheatersReducer from "@/store/theaters_slice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    upcoming: upcomingReducer,
    movieDetails: movieDetailsReducer,
    movies:moviesReducer,
    theaters: TheatersReducer,
    // add more slices here as you build them
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
