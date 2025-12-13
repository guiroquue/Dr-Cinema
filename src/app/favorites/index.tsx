import { Stack } from "expo-router";
import FavoritesView from "@/components/views/favorites_view";

export default function FavoritesScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Úppáhalds",
          headerShadowVisible: false,
          headerRight: () => null,
        }}
      />
      <FavoritesView />
    </>
  );
}
