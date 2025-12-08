export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

export { useAppDispatch, useAppSelector } from "./hooks";

export {
  default as upcomingReducer,
  fetchUpcoming,
  clearUpcomingError,
  setUpcoming,
} from "./upcoming_slice";

export {
  default as currentMoviesReducer,
  fetchCurrentMovies,
  clearCurrentMoviesError,
  setCurrentMovies,
} from "./current_movies_slice";

export {
  default as theatersReducer,
  fetchTheaters,
  fetchTheaterById,
  clearTheatersError,
  setTheaters,
} from "./theaters_slice";

export {
  default as movieDetailsReducer,
  fetchMovieByImdbId,
  clearMovieDetails,
  clearMovieDetailsError,
} from "./movie_details_slice";
