// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites_slice";
import upcomingReducer from "./upcoming_movies_slice";
import movieDetailsReducer from "./upcoming_movie_details_slice";
import moviesReducer from "./current_movie_slice";
import TheatersReducer from "@/store/theaters_slice";
import currentMovieDetailsReducer from "./current_movie_details_slice";
import reviewsReducer from "./reviews_slice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    upcoming: upcomingReducer,
    movies:moviesReducer,
    theaters: TheatersReducer,
    movieDetails: movieDetailsReducer,          // upcoming
    currentMovieDetails: currentMovieDetailsReducer,
    reviews: reviewsReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
