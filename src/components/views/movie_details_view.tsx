import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector, fetchMovieByImdbId } from "@/store";

export default function MovieDetailsView() {
  const theme = Colors.default;

  const { imdbId } = useLocalSearchParams<{ imdbId?: string | string[] }>();
  const resolvedImdbId = Array.isArray(imdbId) ? imdbId[0] : imdbId;

  const dispatch = useAppDispatch();

  const movie = useAppSelector((s) =>
    resolvedImdbId ? s.movieDetails.byImdbId[resolvedImdbId] : undefined
  );
  const loading = useAppSelector((s) =>
    resolvedImdbId ? !!s.movieDetails.loadingByImdbId[resolvedImdbId] : false
  );
  const error = useAppSelector((s) =>
    resolvedImdbId ? s.movieDetails.errorByImdbId[resolvedImdbId] : null
  );

  useEffect(() => {
    if (!resolvedImdbId) return;
    if (!movie) dispatch(fetchMovieByImdbId({ imdbId: resolvedImdbId }));
  }, [dispatch, resolvedImdbId, movie]);

  console.log(movie)
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {!resolvedImdbId && <Text style={styles.text}>Missing imdbId route param.</Text>}

      {resolvedImdbId && loading && <Text style={styles.text}>Loading…</Text>}

      {resolvedImdbId && !loading && error && (
        <Text style={styles.text}>Error: {error}</Text>
      )}

      {resolvedImdbId && !loading && !error && movie && (
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>Year: {movie.year}</Text>
          <Text style={styles.text}>IMDb: {movie.ids?.imdb ?? resolvedImdbId}</Text>
          {!!movie.plot && <Text style={styles.text}>Plot: {movie.plot}</Text>}
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
