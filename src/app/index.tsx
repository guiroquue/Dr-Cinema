import { Stack } from "expo-router";
import CinemasView from "@/src/components/views/cinemas_view";

export default function ContactsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Dr. Cinema",
          headerShadowVisible: false,

        }}
      />
      <CinemasView />
    </>
  );
}
