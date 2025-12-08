import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Colors, Fonts } from "@/constants/theme";

type NavItem = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const items: NavItem[] = [
    { name: "Movies", icon: "film", route: "/" },
    { name: "Theaters", icon: "business", route: "/screens/theaters" },
    { name: "Upcoming", icon: "time", route: "/screens/upcoming" },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.navBar}>
        {items.map((item) => {
          const active = pathname === item.route;

          return (
            <Pressable
              key={item.route}
              onPress={() => router.push(item.route)}
              style={[
                styles.navItem,
                active && styles.navItemActive,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={active ? Colors.default.secondary : Colors.default.primary}
              />

              {active && (
                <Text
                  style={[
                    styles.navText,
                    { color: Colors.default.secondary },
                  ]}
                >
                  {item.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Full-width sticky container at bottom with 20 px padding from edges
  wrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 32,
    zIndex: 11,
  },
  navBar: {
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20, // always 20 padding inside
    backgroundColor: Colors.default.secondary,
    shadowColor: Colors.default.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  navItem: {
    flexDirection: "row", // icon + text side by side
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navItemActive: {
    backgroundColor: Colors.default.primary,
     color: Colors.default.secondary
  },
  navText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: Fonts.body.medium,
    color: Colors.default.primary
  },
});
