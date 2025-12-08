import { Stack } from "expo-router";
import { useFonts } from "expo-font";
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
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            color: theme.secondary,
            fontSize: 20,
            fontFamily: Fonts.heading.semibold,
          },
        }}
      />
    </Provider>
  );
}
