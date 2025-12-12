import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Fonts } from "@/constants/theme";
import { MovieCard } from "@/components/ui/movie_card";
import { ScrollToTopButton } from "@/components/ui/scroll_to_top_button";
import MovieFilters, { DEFAULT_FILTERS } from "@/components/ui/movie_filters";

import type { Movie } from "@/types/movie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadMovies } from "@/store/current_movie_slice";

import { dedupeByImdb } from "@/utils/movie_dedupe";
import { sortByReleaseDate } from "@/utils/movie_sort";
import { applyMovieFilters } from "@/utils/movie_filtering";
import { BlurView } from "expo-blur";

export default function CurrentMoviesView() {
  const listRef = useRef<SectionList<any>>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const theme = Colors.default;
  const dispatch = useAppDispatch();

  const movies = useAppSelector((s) => s.movies.items);
  const loading = useAppSelector((s) => s.movies.loading);
  const error = useAppSelector((s) => s.movies.error);

  const unique = dedupeByImdb(movies);
  const sorted = sortByReleaseDate(unique);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredMovies = useMemo(() => {
    return applyMovieFilters(sorted, filters)
    
  }, [sorted, filters]);

  // -------------------------------
  // Group movies per theater (one card per theater, all showtimes included)
  // -------------------------------
  const sections = useMemo(() => {
    if (!filteredMovies || filteredMovies.length === 0) return [];

    const map: Record<string, any[]> = {};

    for (const movie of filteredMovies) {
      if (!movie.showtimes || movie.showtimes.length === 0) continue;

      // collect all theaters for this movie
      const theaters = Array.from(
        new Set(
          movie.showtimes.map(
            (show) => show.cinema?.name ?? "Óþekkt bíó"
          )
        )
      );

      for (const theater of theaters) {
        if (!map[theater]) map[theater] = [];

        // include movie with just the showtimes for this theater
        const showtimesForTheater = movie.showtimes.filter(
          (s) => ( s.cinema?.name ?? "Óþekkt bíó") === theater
        );

        map[theater].push({
          ...movie,
          showtimes: showtimesForTheater,
          _cinemaKey: `${movie._id ?? movie.ids.imdb}-${theater}`,
        });
      }
    }

    return Object.entries(map).map(([theater, movies]) => ({
      title: theater,
      data: movies,
    }));
  }, [filteredMovies]);
  // -------------------------------

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(loadMovies());
    }
  }, [dispatch, movies.length]);

  function scrollToTop() {
    listRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
    });
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* Filters modal */}
      <Modal visible={filterVisible} animationType="slide" transparent={true}>
        <Pressable style={styles.modalOverlay} onPress={() => setFilterVisible(false)}>
          <BlurView intensity={80} tint="light" style={styles.blurWrapper}>
            <MovieFilters
              filters={filters}
              setFilters={setFilters}
              onApply={() => setFilterVisible(false)}
              onReset={() => setFilters(DEFAULT_FILTERS)}
              onClose={() => setFilterVisible(false)}
            />
          </BlurView>
        </Pressable>
      </Modal>

      {/* GLOBAL FILTER BUTTON */}
      <View style={styles.filterBar}>
        <Pressable onPress={() => setFilterVisible(true)} style={styles.filterIconBtn}>
          <Ionicons name="filter" size={28} color={theme.secondary} />
          <Text style={{ marginLeft: 6, fontFamily: Fonts.body.semibold, fontSize: 16, color: theme.secondary }}>
            Filter
          </Text>
        </Pressable>
      </View>

      {loading && <Text style={styles.sectionHeader}>Loading…</Text>}
      {!loading && error && <Text style={styles.sectionHeader}>Error: {error}</Text>}
      {!loading && !error && filteredMovies.length === 0 && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No movies match your filters 😢</Text>
        </View>
      )}

      {!loading && !error && (
        <SectionList
          ref={listRef}
          sections={sections}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => {
                const imdbId = item.ids.imdb;
                if (!imdbId) return;
                router.push({
                  pathname: "/movie_details",
                  params: { imdbId, type: "movie" },
                });
              }}
            />
          )}
          keyExtractor={(item) => item._cinemaKey}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title.replace(",", "")}</Text>
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 126 }}
          onScroll={(e) => setShowTopBtn(e.nativeEvent.contentOffset.y > 300)}
          scrollEventThrottle={16}
        />
      )}

      <ScrollToTopButton visible={showTopBtn} onPress={scrollToTop} />

      <LinearGradient
        colors={[theme.background + "00", theme.background]}
        style={{ position: "absolute", bottom: 32, left: 0, right: 0, height: insets.bottom + 120, zIndex: 10 }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[theme.background, theme.background + "00"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: insets.top - 26, zIndex: 10 }}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingTop: -58 },
  sectionHeader: {
    fontSize: 32,
    fontFamily: Fonts.heading.black,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 24,
    color: Colors.default.secondary,
    backgroundColor: Colors.default.background,
  },
  filterBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.default.background,
    borderBottomWidth: 1,
    borderColor: Colors.default.secondary + "33",
  },
  filterIconBtn: { flexDirection: "row", alignItems: "center" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
  blurWrapper: {
    maxHeight: "70%",
    flex: 1,
    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: Colors.default.secondary,
    textAlign: "center",
  }

});
