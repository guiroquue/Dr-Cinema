import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Button, Share, Alert, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "@/constants/theme";
import { useMovieDetails } from "@/utils/get_type"; // Added missing import

import MovieInfo from "@/components/ui/movie_details/movie_info";

export default function MovieDetailsView() {
  const theme = Colors.default;
  const insets = useSafeAreaInsets();

  const { imdbId, type } = useLocalSearchParams<{
    imdbId?: string | string[];
    type?: string | string[];
  }>();

  const {
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
  } = useMovieDetails({ imdbId, type });

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
  content: {
    flex: 1,
  }
});
