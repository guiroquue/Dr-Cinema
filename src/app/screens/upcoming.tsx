import { Stack } from "expo-router";
import UpcomingView from "@/src/components/views/upcoming_view";

export default function UpcomingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Væntanlegt",
          headerShadowVisible: false,

        }}
      />
      <UpcomingView />
    </>
  );
}
