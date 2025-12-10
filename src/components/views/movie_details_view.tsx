import { useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadMovieDetails,
  clearMovieDetails,
} from "@/store/upcoming_movie_details_slice";
import FavoriteButton from "../ui/favorite_button";

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

  // 🔍 Normalize poster URL
  const posterUrl = useMemo(() => {
    if (!item) return null;

    return (
      item.poster ||
      item.poster_url ||
      item.primaryImage ||
      item.primaryImage?.url ||
      item.images?.poster ||
      item.image ||
      null
    );
  }, [item]);


  // 🔍 Extract trailers from complex structure
  const trailers = useMemo(() => {
    if (!item?.trailers) return [];

    const allResults = item.trailers.flatMap((t: any) => t.results ?? []);

    const filtered = allResults.filter(
      (r: any) => r.site === "YouTube" && r.type === "Trailer"
    );

    const unique = new Map<string, any>();
    for (const t of filtered) {
      const key = t.id ?? t.key;
      if (!key) continue;
      if (!unique.has(key)) unique.set(key, t);
    }

    return Array.from(unique.values());
  }, [item]);

  const openTrailer = (t: any) => {
    const url =
      t.url ||
      (t.key ? `https://www.youtube.com/watch?v=${encodeURIComponent(t.key)}` : null);
    if (url) Linking.openURL(url);
  };

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
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* 🎞 Poster */}
          {posterUrl && (
            <Image
              source={{ uri: posterUrl }}
              resizeMode="cover"
              style={styles.poster}
            />
          )}

          {/* Title + metadata */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>Year: {item.year}</Text>
          <Text style={styles.text}>
            IMDb: {item.ids?.imdb ?? resolvedImdbId}
          </Text>

          {!!item.plot && <Text style={styles.text}>Plot: {item.plot}</Text>}

          <FavoriteButton movie={item} />

          {/* 🎬 Trailers section */}
          {trailers.length > 0 && (
            <View style={styles.trailersContainer}>
              <Text style={styles.trailersHeader}>Trailers</Text>

              {trailers.map((t: any) => (
                <Pressable
                  key={t.id ?? t.key}
                  onPress={() => openTrailer(t)}
                  style={styles.trailerButton}
                >
                  <Text style={styles.trailerText}>
                    {t.name || "Watch trailer"}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },

  poster: {
    width: "100%",
    height: 450,
    borderRadius: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  text: {
    paddingHorizontal: 20,
    marginBottom: 8,
    fontSize: 16,
  },

  trailersContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  trailersHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  trailerButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.default.action,
    marginTop: 8,
  },

  trailerText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.default.action,
  },
});
