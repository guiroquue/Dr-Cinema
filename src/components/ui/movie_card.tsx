import { useRef } from "react";
import { Image, StyleSheet, Text, View, Pressable, Animated } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

import type { Movie } from "@/types/movie";
import { FavoriteMovie } from "@/store/favorites_slice";

import { formatDateIS } from "@/utils/date_formatter";

interface MovieCardProps {
  movie: Movie | FavoriteMovie;
  type?: "movie" | "upcoming";
  onPress?: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  // --- RELEASE DATE ---
  const rawRelease =
    movie["release-dateIS"] && movie["release-dateIS"].trim().length > 0
      ? movie["release-dateIS"]
      : movie.year;

  const release =
    typeof rawRelease === "string" && rawRelease.includes("-")
      ? formatDateIS(rawRelease)
      : rawRelease ?? "";

  // --- SAFE RATING ---
  const rawRating = movie.omdb?.[0]?.Rated;
  const rating =
    rawRating && rawRating !== "N/A"
      ? rawRating
      : null; // Favorites will have null

  // --- SAFE DIRECTORS ---
  const directors = movie.directors_abridged
    ? movie.directors_abridged.map((d) => d.name).join(", ")
    : null;

  // --- SAFE ACTORS ---
  const actors = movie.actors_abridged
    ? movie.actors_abridged.map((a) => a.name).slice(0, 3).join(", ")
    : null;

  // --- SAFE GENRES ---
  const genres = movie.genres
    ? movie.genres.map((g) => g.Name).join(", ")
    : null;

  // --- ANIMATION ---
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 80,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={animateIn} onPressOut={animateOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        {/* POSTER + RATING */}
        <View>
          <Image source={{ uri: movie.poster }} style={styles.poster} />

          {rating && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          )}
        </View>

        {/* INFO AREA */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          {release && (
            <Text style={styles.date}>{release}</Text>
          )}

          {directors && (
            <Text style={styles.row}>
              <Text style={styles.label}>Leikstjórn: </Text>
              <Text style={styles.value}>{directors}</Text>
            </Text>
          )}

          {actors && (
            <Text style={styles.row}>
              <Text style={styles.label}>Leikarar: </Text>
              <Text style={styles.value}>{actors}</Text>
            </Text>
          )}

          {genres && (
            <Text style={[styles.row, { marginTop: 6 }]}>
              <Text style={styles.value}>{genres}</Text>
            </Text>
          )}
        </View>

        {/* CHEVRON */}
        <View style={styles.ticketEnd}>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={Colors.default.secondary}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

// STYLES UNCHANGED
const BG = Colors.default.primary;
const TEXT = Colors.default.secondary;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: BG,
    padding: 6,
    borderRadius: 14,
    marginBottom: 20,

    shadowColor: TEXT,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
    overflow: "visible",

    borderWidth: 0.5,
    borderColor: TEXT,
  },

  poster: {
    width: 110,
    height: 165,
    borderRadius: 10,
    backgroundColor: "#DDD",
    borderWidth: 0.5,
    borderColor: TEXT,
  },

  ratingBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.default.action + "DD",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  ratingText: {
    color: BG,
    fontFamily: Fonts.body.medium,
    fontSize: 12,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 18,
    fontFamily: Fonts.heading.black,
    color: TEXT,
    marginBottom: 4,
    marginTop: 8,
  },

  date: {
    fontSize: 12,
    fontFamily: Fonts.body.medium,
    color: TEXT + "AA",
    marginBottom: 12,
  },

  row: {
    marginBottom: 2,
    flexWrap: "wrap",
  },

  label: {
    fontFamily: Fonts.body.semibold,
    fontSize: 12,
    color: TEXT,
  },

  value: {
    fontFamily: Fonts.body.regular,
    fontSize: 11,
    color: TEXT,
  },

  ticketEnd: {
    display: "flex",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: TEXT,
    paddingLeft: 4,
    marginLeft: 16,
    borderStyle: "dashed",
  },
});
