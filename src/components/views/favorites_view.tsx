import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { MovieCard } from "@/components/ui/movie_card";
import { router } from "expo-router";
import { setFavorites } from "@/store/favorites_slice";

export default function FavoritesView() {
  const theme = Colors.default;
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.items);

  const handleDragEnd = ({ data }: { data: typeof favorites }) => {
    dispatch(setFavorites(data));
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<typeof favorites[0]>) => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          opacity: isActive ? 0.7 : 1,
          marginBottom: 16,
        }}
      >

        <TapGestureHandler
          onActivated={() => {
            router.push({
              pathname: "/movie_details",
              params: { imdbId: item.imdbId },
            });
          }}
        >
          <View>
            <MovieCard movie={item} />
          </View>
        </TapGestureHandler>

        <TouchableOpacity
          onLongPress={drag}
          delayLongPress={150}
          style={{
            alignSelf: "center",
            padding: 10,
            marginTop: 5,
          }}
        >
          <Ionicons name="reorder-three-outline" size={32} color="#888" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <DraggableFlatList
          data={favorites}
          keyExtractor={(item) => item.imdbId}
          renderItem={renderItem}
          onDragEnd={handleDragEnd}
          activationDistance={0}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
