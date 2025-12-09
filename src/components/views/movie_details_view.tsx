import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadMovieDetails, clearMovieDetails } from "@/store/upcoming_movie_details_slice";

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
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>Year: {item.year}</Text>
          <Text style={styles.text}>IMDb: {item.ids?.imdb ?? resolvedImdbId}</Text>
          {!!item.plot && <Text style={styles.text}>Plot: {item.plot}</Text>}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    marginTop: 12,
    marginBottom: 8,
  },
  text: {
    marginTop: 8,
  },
});
