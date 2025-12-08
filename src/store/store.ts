import { configureStore } from "@reduxjs/toolkit";
import upcomingReducer from "./upcoming_slice";
import currentMoviesReducer from "./current_movies_slice";
import theatersReducer from "./theaters_slice";
import fetchMovieByImdbId from "@/store/movie_details_slice";

export const store = configureStore({
  reducer: {
    upcoming: upcomingReducer,
    currentMovies: currentMoviesReducer,
    theaters: theatersReducer,
    movieDetails: fetchMovieByImdbId,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
