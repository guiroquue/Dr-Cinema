import { Stack } from "expo-router";
import TheatersView from "@/src/components/views/theaters_view";

export default function TheatersScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Bíó",
          headerShadowVisible: false,

        }}
      />
      <TheatersView />
    </>
  );
}
