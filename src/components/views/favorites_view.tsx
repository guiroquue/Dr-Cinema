import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/store/hooks";
import { MovieCard } from "@/components/ui/movie_card";
import { router } from "expo-router";

export default function FavoritesView() {
  const theme = Colors.default;
  const favorites = useAppSelector(s => s.favorites.items);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.imdbId}
        renderItem={({ item }) => (
          <MovieCard
            movie={item} // fully compatible
            onPress={() => router.push({ pathname: "/movie_details", params: { imdbId: item.imdbId } })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
