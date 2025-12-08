
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useRef, useEffect, useState } from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors, Fonts } from "@/constants/theme";

import { fetchUpcoming } from "@/services/upcoming_service";

import { MovieCard } from "@/components/ui/movie_card";
import { ScrollToTopButton } from "@/components/ui/scroll_to_top_button";
import NavigationBar from "@/components/ui/nav_bar"

import type { Movie } from "@/types/movie";

import { filterUpcoming } from "@/utils/filter_upcoming";
import { dedupeByImdb } from "@/utils/movie_dedupe";
import { sortByReleaseDate } from "@/utils/movie_sort";
import { groupMoviesByMonth } from "@/utils/movie_group";



export default function UpcomingView() {
    const listRef = useRef<SectionList<Movie>>(null);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const insets = useSafeAreaInsets();

    const theme = Colors.default;
    const [movies, setMovies] = useState<Movie[]>([]);

    const unreleased = filterUpcoming(movies);
    const unique = dedupeByImdb(unreleased);
    const sorted = sortByReleaseDate(unique);
    const sections = groupMoviesByMonth(sorted);

    useEffect(() => {
        fetchUpcoming()
        .then((data) => {
            setMovies(data);
        })
        .catch(console.error);
    }, []);

    function scrollToTop() {
        listRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
        });
    }

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.safe, { backgroundColor: theme.background }]}>
            <SectionList
            ref={listRef}
            sections={sections}
            renderItem={({ item }) => <MovieCard
            movie={item}
            onPress={() => router.push(`/screens/movie_details`)}
            />}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 126,
            }}
            onScroll={(e) => {
                const y = e.nativeEvent.contentOffset.y;
                setShowTopBtn(y > 300);
            }}
            scrollEventThrottle={16}
            />

            <ScrollToTopButton visible={showTopBtn} onPress={scrollToTop} />
            <NavigationBar />

            <LinearGradient
                colors={[theme.background + "00", theme.background]}
                style={{
                position: "absolute",
                bottom: 32,
                left: 0,
                right: 0,
                height: insets.bottom + 120,
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
