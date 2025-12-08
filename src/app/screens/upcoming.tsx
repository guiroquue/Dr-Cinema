import { Stack } from "expo-router";
import UpcomingView from "@/components/views/upcoming_view";

export default function UpcomingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Væntanlegt í Bíó",
          headerShadowVisible: false,

        }}
      />
      <UpcomingView />
    </>
  );
}
