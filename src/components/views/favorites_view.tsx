import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { MovieCard } from "@/components/ui/movie_card";
import { router } from "expo-router";
import { setFavorites } from "@/store/favorites_slice";
import { LinearGradient } from "expo-linear-gradient";

export default function FavoritesView() {
  const theme = Colors.default;
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.items);
  const insets = useSafeAreaInsets();

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
            if (!item.imdbId) {
              console.warn("Favorite item is missing imdbId:", item);
              return;
            }
            const itemType = item.type || "movie"; // default fallback
            router.push({
              pathname: "/movie_details",
              params: { imdbId: item.imdbId, type: itemType },
            });
          }}
        >
        <View>
          <MovieCard movie={item} type={item.type} />
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

          <Ionicons name="reorder-three-outline" size={32} color={Colors.default.secondary} style={{marginTop: -28, marginBottom: 12}} />


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

        <LinearGradient
          colors={[Colors.default.background + "00", Colors.default.background]}
          style={{ position: "absolute", bottom: 64, left: 0, right: 0, height: insets.bottom + 32, zIndex: 10 }}
          pointerEvents="none"
        />
        <LinearGradient
          colors={[Colors.default.background, Colors.default.background + "00"]}
          style={{ position: "absolute", top: 12, left: 0, right: 0, height: insets.top + 26, zIndex: 10 }}
          pointerEvents="none"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: -32,
    paddingBottom: 32,
  },
});
