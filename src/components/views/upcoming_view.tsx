import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, Image, View, StyleSheet } from "react-native";
import { fetchUpcoming } from "@/src/services/upcoming_service";
import { Colors } from "@/src/constants/theme";
import type { Movie } from "@/src/types/movie";

export default function UpcomingView() {
    const theme = Colors.default;
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetchUpcoming()
        .then((data) => {
            setMovies(data);
        })
        .catch(console.error);
    }, []);

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>

                    {/* Poster */}
                    <Image
                    source={{ uri: item.poster }}
                    style={{ width: 120, height: 180, borderRadius: 8 }}
                    />

                    {/* Title + Year */}
                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
                    {item.title} ({item.year})
                    </Text>

                    {/* Optional genres */}
                    <Text style={{ color: "#777" }}>
                    {item.genres.map((g) => g.NameEN ?? g.Name).join(", ")}
                    </Text>

                </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 64,
    paddingTop: -24,
  },
});
