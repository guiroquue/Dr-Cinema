export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

export { useAppDispatch, useAppSelector } from "./hooks";

export { default as moviesReducer, fetchUpcoming, clearUpcomingError, setUpcoming } from "./moviesSlice";
