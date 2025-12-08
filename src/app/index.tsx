import { Stack, useRouter } from "expo-router";
import HomeView from "@/components/views/home_view";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme"

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerBackVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/screens/favorites")}
              style={{ paddingLeft: 5 }}
            >
              <Ionicons name="heart" size={26} color={ Colors.default.action } />
            </Pressable>
          ),
        }}

      />
      <HomeView />
    </>
  );
}
