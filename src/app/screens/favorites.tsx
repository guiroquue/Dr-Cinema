import { Stack } from "expo-router";
import FavoritesView from "@/components/views/favorites_view";

export default function FavoritesScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <FavoritesView />
    </>
  );
}
