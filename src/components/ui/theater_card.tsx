import React, { useMemo } from "react";
import { FlatList, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";

export interface Theater {
  id: number;
  name: string;
  website?: string | null;
}

function normalizeWebsite(url?: string | null) {
  const trimmed = (url ?? "").trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

async function openUrl(url: string) {
  if (!url) return;
  try {
    const can = await Linking.canOpenURL(url);
    if (can) await Linking.openURL(url);
  } catch {
    // no-op
  }
}

type CinemaListProps = {
  theaters: Theater[];
};

export function CinemaList({ theaters }: CinemaListProps) {
  const data = useMemo(() => {
    return [...theaters].sort((a, b) =>
      (a.name ?? "").localeCompare(b.name ?? "", undefined, { sensitivity: "base" })
    );
  }, [theaters]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      renderItem={({ item }) => {
        const websiteUrl = normalizeWebsite(item.website);
        const websiteLabel = (item.website ?? "").trim();

        return (
          <View style={styles.card}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            <Pressable
              onPress={() => openUrl(websiteUrl)}
              disabled={!websiteUrl}
              hitSlop={10}
              style={[styles.websiteRow, !websiteUrl && styles.disabled]}
            >
              <Ionicons name="globe-outline" size={16} color={Colors.default.primary} />
              <Text style={styles.websiteText} numberOfLines={1}>
                {websiteLabel || "No website"}
              </Text>
              {!!websiteUrl && (
                <Ionicons name="open-outline" size={16} color={Colors.default.primary} />
              )}
            </Pressable>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12 },
  sep: { height: 10 },

  card: {
    backgroundColor: Colors.default.primary,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: Colors.default.secondary,
    padding: 12,
    gap: 10,
  },

  name: {
    color: Colors.default.secondary,
    fontFamily: Fonts.heading.semibold,
    fontSize: 16,
  },

  websiteRow: {
    backgroundColor: Colors.default.action,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8 as any,
  },

  websiteText: {
    flex: 1,
    color: Colors.default.primary,
    fontFamily: Fonts.body.semibold,
    fontSize: 12,
  },

  disabled: { opacity: 0.45 },
});
