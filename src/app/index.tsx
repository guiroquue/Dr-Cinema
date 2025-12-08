import { Stack } from "expo-router";
import HomeView from "@/components/views/home_view";

export default function ContactsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
        }}
      />
      <HomeView />
    </>
  );
}
