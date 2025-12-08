import { Stack } from "expo-router";
import MovieDetailsView from "@/src/components/views/movie_details_view";

export default function UpcomingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Movies",
          headerShadowVisible: false,

        }}
      />
      <MovieDetailsView />
    </>
  );
}
