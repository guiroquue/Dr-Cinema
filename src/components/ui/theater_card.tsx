import React, { useMemo, useRef } from "react";
import {
  Animated,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors, Fonts } from "@/constants/theme";
import type { Theater } from "@/types/theatre";
import { WebsiteLink, normalizeWebsite } from "./theater_website_link";


function usePressAnim() {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (to: number) => {
    Animated.spring(scale, {
      toValue: to,
      speed: 18,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return {
    animatedStyle: { transform: [{ scale }] },
    onPressIn: () => animate(0.97),
    onPressOut: () => animate(1),
  };
}


function TheaterCard({
  theater,
  onPress,
}: {
  theater: Theater;
  onPress: () => void;
}) {
  const theme = Colors.default;
  const website = (theater.website ?? "").trim();
  const websiteUrl = website ? normalizeWebsite(website) : null;

  const anim = usePressAnim();

  return (
    <Animated.View style={[styles.card, styles.shadow, anim.animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={anim.onPressIn}
        onPressOut={anim.onPressOut}
        style={styles.cardInner}
      >
        <Text style={[styles.name, { color: theme.primary }]} numberOfLines={1}>
          {theater.name.replace(",", "")}
        </Text>

        {websiteUrl && <WebsiteLink url={websiteUrl} label={website} />}
      </Pressable>
    </Animated.View>
  );
}


export function CinemaList({ theaters }: { theaters: Theater[] }) {
  const router = useRouter();

  const sorted = useMemo(
    () => [...theaters].sort((a, b) => (a.name.replace(",", " ") ?? "").localeCompare(b.name.replace(",", " ") ?? "")),
    [theaters]
  );

  return (
    <FlatList
      data={sorted}
      keyExtractor={(t) => String(t.id)}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      renderItem={({ item }) => (
        <TheaterCard
          theater={item}
          onPress={() =>
            router.push({
              pathname: "/theater_details",
              params: { id: String(item.id) }
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: Colors.default.secondary,
    padding: 12,
    borderRadius: 12,
  },

  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  cardInner: {
    flexDirection: "column",
    gap: 12,
  },

  name: {
    fontSize: 28,
    fontFamily: Fonts.heading.bold,
    borderBottomWidth: 1,
    paddingBottom: 22,
    borderStyle: "dashed",
    borderColor: Colors.default.primary,
  },

  websiteBtn: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.default.primary
  },

  websiteLabel: {
    flex: 1,
    fontSize: 16,
    marginBottom: 2,
    fontFamily: Fonts.body.semibold,
  },
});
