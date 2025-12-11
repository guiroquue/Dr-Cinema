import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, View, Text } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

import MoviesIcon from "@/assets/icons/projector_icon.svg";
import TheatersIcon from "@/assets/icons/popcorn_icon.svg";
import UpcomingIcon from "@/assets/icons/cassette_icon.svg";

export default function TabsLayout() {
  return (
    <Tabs
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: Colors.default.secondary,
    tabBarItemStyle: {
        paddingTop: 12,
        paddingBottom: 12,
    },
    tabBarStyle: {
        height: 112,
        position: "absolute",
        borderTopWidth: 0.5,
        borderTopColor: "rgba(0,0,0,0.10)",
        backgroundColor: "transparent",
        elevation: 0,
    },
    tabBarBackground: () =>
      Platform.OS === "ios" ? (
        <BlurView tint="light" intensity={20} style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1, backgroundColor: Colors.default.primary }} />
      ),
  }}
>

      <Tabs.Screen
        name="index"
        options={{
            tabBarLabel: ({ focused, color }) =>
            focused ? (
                <Text
                style={{
                    fontSize: 12,
                    fontFamily: Fonts.heading.bold,
                    color,
                    marginTop: 8,
                }}
                >
                Myndir
                </Text>
            ) : null,

            tabBarIcon: ({ focused }) => (
            <MoviesIcon
                width={focused ? 48 : 28}
                height={focused ? 48 : 28}
                opacity={focused ? 1 : 0.5}
            />
            ),
        }}
        />

      <Tabs.Screen
        name="theaters/index"
        options={{
            tabBarLabel: ({ focused, color }) =>
            focused ? (
                <Text
                style={{
                    fontSize: 12,
                    fontFamily: Fonts.heading.bold,
                    color,
                    marginTop: 8,
                }}
                >
                Bíó
                </Text>
            ) : null,

            tabBarIcon: ({ focused }) => (
            <TheatersIcon
                width={focused ? 48 : 28}
                height={focused ? 48 : 28}
                opacity={focused ? 1 : 0.5}
            />
            ),
        }}
        />

        <Tabs.Screen
        name="upcoming/index"
        options={{
            tabBarLabel: ({ focused, color }) =>
            focused ? (
                <Text
                style={{
                    fontSize: 12,
                    fontFamily: Fonts.heading.bold,
                    color,
                    marginTop: 8,
                }}
                >
                Væntanlegt
                </Text>
            ) : null,

            tabBarIcon: ({ focused }) => (
            <UpcomingIcon
                width={focused ? 48 : 28}
                height={focused ? 48 : 28}
                opacity={focused ? 1 : 0.5}
            />
            ),
        }}
        />
    </Tabs>
  );
}
