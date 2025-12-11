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
import { applyMovieFilters, MovieFilter } from "@/utils/movie_filtering";

export default function CurrentMoviesView() {
  const listRef = useRef<SectionList<Movie>>(null);
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

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filteredMovies = useMemo(() => {
    return applyMovieFilters(sorted, filters);
  }, [sorted, filters]);

  const sections = filteredMovies.length > 0 ? [{ title: "Now playing", data: filteredMovies }] : [];

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
          <View style={styles.modalContent}>
            <MovieFilters
              filters={filters}
              setFilters={setFilters}
              onApply={() => setFilterVisible(false)}
              onReset={() => setFilters(DEFAULT_FILTERS)}
              onClose={() => setFilterVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>

      {loading && <Text style={styles.sectionHeader}>Loading…</Text>}
      {!loading && error && <Text style={styles.sectionHeader}>Error: {error}</Text>}

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
                router.push({ pathname: "/movie_details", params: { imdbId } });
              }}
            />
          )}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <Pressable onPress={() => setFilterVisible(true)} style={styles.filterIconBtn}>
                <Ionicons name="filter" size={28} color={theme.secondary} />
              </Pressable>
            </View>
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
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  filterIconBtn: { padding: 4 },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    padding: 20 
  },
  modalContent: { 
    backgroundColor: Colors.default.background, 
    borderRadius: 12, 
    padding: 16, 
    maxHeight: "80%" 
  },
});
