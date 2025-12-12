import { useEffect, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  upcomingLoadMovieDetails,
  clearMovieDetails as clearUpcomingMovieDetails,
} from "@/store/upcoming_movie_details_slice";

import {
  loadMovieDetails as loadCurrentMovieDetails,
  clearMovieDetails as clearCurrentMovieDetails,
} from "@/store/current_movie_details_slice";

import MovieInfo from "@/components/ui/movie_details/movie_info";

export default function MovieDetailsView() {
  const theme = Colors.default;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { imdbId, type } = useLocalSearchParams<{
    imdbId?: string | string[];
    type?: string | string[];
  }>();

  const resolvedImdbId = Array.isArray(imdbId) ? imdbId[0] : imdbId;
  const resolvedType = Array.isArray(type) ? type[0] : type;

  const isUpcoming = resolvedType === "upcoming";
  const isCurrent = resolvedType === "movie";

  console.log("MovieDetails params:", imdbId, type);

  const upcomingState = useAppSelector((s) => s.movieDetails);
  const currentState = useAppSelector((s) => s.currentMovieDetails);


  const state =
    resolvedType === "upcoming"
      ? useAppSelector((s) => s.movieDetails)
      : resolvedType === "movie"
      ? useAppSelector((s) => s.currentMovieDetails)
      : { item: null, loading: false, error: "Invalid type" };

  const { item, loading, error } = state;


  useEffect(() => {
    if (missingParams || invalidType) return;

    switch (resolvedType) {
      case "upcoming":
        dispatch(upcomingLoadMovieDetails({ imdbId: resolvedImdbId! }));
        break;

      case "movie":
        dispatch(loadCurrentMovieDetails({ imdbId: resolvedImdbId! }));
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
  }, [resolvedImdbId, resolvedType]);

  const posterUrl = useMemo(() => {
    if (!item) return null;
    return item.poster || null;
  }, [item]);

  const missingParams = !resolvedImdbId || !resolvedType;
  const invalidType = !!resolvedType && !isUpcoming && !isCurrent;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>

      {missingParams && (
        <Text style={styles.text}>Missing imdbId or type route param.</Text>
      )}

      {!missingParams && invalidType && (
        <Text style={styles.text}>
          Invalid type param (expected "upcoming" or "movie").
        </Text>
      )}

      {!missingParams && !invalidType && loading && (
        <Text style={styles.text}>Loading…</Text>
      )}

      {!missingParams && !invalidType && !loading && error && (
        <Text style={styles.text}>Error: {error}</Text>
      )}

      {!missingParams &&
        !invalidType &&
        resolvedImdbId &&
        !loading &&
        !error &&
        item && (
          <>
            <MovieInfo item={item} posterUrl={posterUrl} type={resolvedType as "movie" | "upcoming"} />


          </>
        )}


      <LinearGradient
        colors={[Colors.default.background + "00", Colors.default.background]}
        style={{
          position: "absolute",
          bottom: 64,
          left: 0,
          right: 0,
          height: insets.bottom + 12,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[Colors.default.background, Colors.default.background + "00"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: insets.top - 24,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: -48,
    paddingBottom: 32,
  },
  text: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
