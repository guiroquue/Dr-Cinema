import { Stack, router } from "expo-router";
import { Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Fonts } from "@/constants/theme";

// Fonts
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
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: theme.background,
          },

          headerTitleStyle: {
            color: theme.secondary,
            fontFamily: Fonts.heading.semibold,
            fontSize: 22,
          },

          headerTintColor: theme.secondary,

          headerRight: () => (
            <Pressable
              onPress={() => router.push("/favorites")}
              style={{ paddingLeft: 6}}
            >
              <Ionicons
                name="heart"
                size={24}
                color={theme.action}
                style={{
                  marginTop: Platform.OS === "ios" ? 1 : 0,
                }}
              />
            </Pressable>
          ),
        }}
      >

        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Dr. Cinema",
          }}
        />

        <Stack.Screen
          name="favorites/index"
          options={{
            title: "Favorites",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="movie_details/index"
          options={{
            title: "Movie Details",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
  );
}
