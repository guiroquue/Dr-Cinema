// hooks/useMovieDetails.ts
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  upcomingLoadMovieDetails,
  clearMovieDetails as clearUpcomingMovieDetails,
} from "@/store/upcoming_movie_details_slice";
import {
  loadMovieDetails,
  clearMovieDetails as clearCurrentMovieDetails,
} from "@/store/current_movie_details_slice";

type MovieType = "movie" | "upcoming";

type Params = {
  imdbId?: string | string[] | null;
  type?: string | string[] | null;
};

export function useMovieDetails({ imdbId, type }: Params) {
  const dispatch = useAppDispatch();

  // 1) Normalize router params (string | string[])
  const resolvedImdbId = Array.isArray(imdbId) ? imdbId[0] : imdbId ?? null;
  const resolvedType = (Array.isArray(type) ? type[0] : type) as
    | MovieType
    | null
    | undefined;

  const isUpcoming = resolvedType === "upcoming";
  const isCurrent = resolvedType === "movie";

  const missingParams = !resolvedImdbId || !resolvedType;
  const invalidType = !!resolvedType && !isUpcoming && !isCurrent;

  // 2) Select both slices unconditionally (to obey hooks rules)
  const upcomingState = useAppSelector((s) => s.movieDetails);
  const currentState = useAppSelector((s) => s.currentMovieDetails);

  const state =
    resolvedType === "upcoming"
      ? upcomingState
      : resolvedType === "movie"
      ? currentState
      : { item: null, loading: false, error: "Invalid type" as string };

  const { item, loading, error } = state;

  // 3) Fetch + cleanup
  useEffect(() => {
    if (missingParams || invalidType || !resolvedImdbId) return;

    switch (resolvedType) {
      case "upcoming":
        dispatch(upcomingLoadMovieDetails({ imdbId: resolvedImdbId }));
        break;

      case "movie":
        dispatch(loadMovieDetails({ imdbId: resolvedImdbId }));
        break;
    }

    return () => {
      switch (resolvedType) {
        case "upcoming":
          dispatch(clearUpcomingMovieDetails());
          break;
        case "movie":
          dispatch(clearCurrentMovieDetails());
          break;
      }
    };
  }, [resolvedImdbId, resolvedType, missingParams, invalidType, dispatch]);

  // 4) Poster URL memo
  const posterUrl = useMemo(() => {
    if (!item) return null;
    return item.poster || null;
  }, [item]);

  return {
    item,
    loading,
    error,
    posterUrl,
    resolvedImdbId,
    resolvedType,
    isUpcoming,
    isCurrent,
    missingParams,
    invalidType,
  };
}
