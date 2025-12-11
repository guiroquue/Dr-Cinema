import { useEffect, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadMovieDetails,
  clearMovieDetails,
} from "@/store/upcoming_movie_details_slice";

import MovieInfo from "@/components/ui/movie_details/movie_info";

export default function MovieDetailsView() {
  const theme = Colors.default;

  const { imdbId } = useLocalSearchParams<{ imdbId?: string | string[] }>();
  const resolvedImdbId = Array.isArray(imdbId) ? imdbId[0] : imdbId;

  const dispatch = useAppDispatch();

  const item = useAppSelector((s) => s.movieDetails.item);
  const loading = useAppSelector((s) => s.movieDetails.loading);
  const error = useAppSelector((s) => s.movieDetails.error);

  useEffect(() => {
    if (!resolvedImdbId) return;

    dispatch(loadMovieDetails({ imdbId: resolvedImdbId }));

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, resolvedImdbId]);

  // Poster selection logic
  const posterUrl = useMemo(() => {
    if (!item) return null;

    return (
      item.poster ||
      null
    );
  }, [item]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {!resolvedImdbId && (
        <Text style={styles.text}>Missing imdbId route param.</Text>
      )}

      {resolvedImdbId && loading && (
        <Text style={styles.text}>Loading…</Text>
      )}

      {resolvedImdbId && !loading && error && (
        <Text style={styles.text}>Error: {error}</Text>
      )}

      {resolvedImdbId && !loading && !error && item && (
        <MovieInfo item={item} posterUrl={posterUrl} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  text: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
