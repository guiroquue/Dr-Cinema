import { Stack, router } from "expo-router";
import { Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Fonts } from "@/constants/theme";

import { Provider } from "react-redux";
import { store } from "@/store";

import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black,
} from "@expo-google-fonts/playfair-display";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setFavorites } from "@/store/favorites_slice";
import { loadFavorites } from "@/utils/favorite_movies";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function InitFavorites() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadFavorites().then(saved => {
      dispatch(setFavorites(saved));
    });
  }, [dispatch]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const theme = Colors.default;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <InitFavorites />
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.background },
            headerTitleStyle: { color: theme.secondary, fontFamily: Fonts.heading.semibold, fontSize: 22 },
            headerTintColor: theme.secondary,
            headerRight: () => (
              <Pressable onPress={() => router.push("/favorites")} style={{ paddingLeft: 6 }}>
                <Ionicons name="heart" size={24} color={theme.action} style={{ marginTop: Platform.OS === "ios" ? 1 : 0 }} />
              </Pressable>
            ),
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: "Dr. Bíó" }} />
          <Stack.Screen name="favorites/index" options={{ title: "", headerBackTitle: "Til baka" }} />
          <Stack.Screen name="movie_details/index" options={{ title: "", headerBackTitle: "Til baka" }} />
          <Stack.Screen name="theater_details/index" options={{ title: "", headerBackTitle: "Til baka" }} />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
