import { useEffect, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

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
import MovieReviews from "@/components/ui/movie_review";
import { LinearGradient } from "expo-linear-gradient";

export default function MovieDetailsView() {
  const theme = Colors.default;
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

  const insets = useSafeAreaInsets();

  const { item, loading, error } = isUpcoming
    ? upcomingState
    : isCurrent
    ? currentState
    : { item: null, loading: false, error: "Invalid type param" };

  useEffect(() => {
    if (!resolvedImdbId || !resolvedType) return;

    if (isUpcoming) {
      dispatch(upcomingLoadMovieDetails({ imdbId: resolvedImdbId }));
    } else if (isCurrent) {
      dispatch(loadCurrentMovieDetails({ imdbId: resolvedImdbId }));
    }

    return () => {
      if (isUpcoming) {
        dispatch(clearUpcomingMovieDetails());
      } else if (isCurrent) {
        dispatch(clearCurrentMovieDetails());
      }
    };
  }, [dispatch, resolvedImdbId, resolvedType, isUpcoming, isCurrent]);

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

      {!missingParams && !invalidType && resolvedImdbId && loading && (
        <Text style={styles.text}>Loading…</Text>
      )}

      {!missingParams && !invalidType && resolvedImdbId && !loading && error && (
        <Text style={styles.text}>Error: {error}</Text>
      )}

      {!missingParams &&
        !invalidType &&
        resolvedImdbId &&
        !loading &&
        !error &&
        item && (
          <>
            <MovieInfo item={item} posterUrl={posterUrl} />

            <MovieReviews imdbId={resolvedImdbId} />
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
