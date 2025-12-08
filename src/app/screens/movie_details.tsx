import { Stack } from "expo-router";
import MovieDetailsView from "@/components/views/movie_details_view";

export default function UpcomingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Movie",
          headerShadowVisible: false,

        }}
      />
      <MovieDetailsView />
    </>
  );
}
