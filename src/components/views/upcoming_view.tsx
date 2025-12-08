
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useRef, useEffect, useState } from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Fonts } from "@/constants/theme";

import { MovieCard } from "@/components/ui/movie_card";
import { ScrollToTopButton } from "@/components/ui/scroll_to_top_button";

import type { Movie } from "@/types/movie";

import { useAppDispatch, useAppSelector, fetchUpcoming } from "@/store";

import { filterUpcoming } from "@/utils/filter_upcoming";
import { dedupeByImdb } from "@/utils/movie_dedupe";
import { sortByReleaseDate } from "@/utils/movie_sort";
import { groupMoviesByMonth } from "@/utils/movie_group";

export default function UpcomingView() {
    const listRef = useRef<SectionList<Movie>>(null);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const insets = useSafeAreaInsets();

    const theme = Colors.default;
    const dispatch = useAppDispatch();
    const movies = useAppSelector((s) => s.movies.upcoming);
    const loading = useAppSelector((s) => s.movies.loadingUpcoming);
    const error = useAppSelector((s) => s.movies.upcomingError);


    const unreleased = filterUpcoming(movies);
    const unique = dedupeByImdb(unreleased);
    const sorted = sortByReleaseDate(unique);
    const sections = groupMoviesByMonth(sorted);

    useEffect(() => {
    if (movies.length === 0) dispatch(fetchUpcoming());
    }, [dispatch, movies.length]);



    function scrollToTop() {
        listRef.current?.scrollToLocation({ sectionIndex: 0, itemIndex: 0, animated: true });
    }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={[styles.safe, { backgroundColor: theme.background }]}>
      {loading && (
        <Text style={styles.sectionHeader}>Loading…</Text>
      )}

      {!loading && error && (
        <Text style={styles.sectionHeader}>Error: {error}</Text>
      )}

      {!loading && !error && (
        <SectionList
          ref={listRef}
          sections={sections}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => router.push(`/screens/movie_details`)}
            />
          )}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
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
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          height: insets.bottom + 100,
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
    paddingTop: -24,
  },

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
});
