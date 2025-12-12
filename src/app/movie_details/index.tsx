import { Stack } from "expo-router";
import MovieDetailsView from "@/components/views/movie_details_view";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { Fonts } from "@/constants/theme";

export default function UpcomingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Dr.Bíó",
          headerShadowVisible: false,
          headerRight: () => null,
          headerTitle: () => (
            <Pressable
              onPress={() => {
                router.dismissAll();
                router.replace("/(tabs)");
              }}
            >
              <Text style={{ fontFamily: Fonts.heading.semibold, fontSize: 22 }}>
                Dr.Bíó
              </Text>
            </Pressable>
          ),
        }}
      />
      <MovieDetailsView />
    </>
  );
}
