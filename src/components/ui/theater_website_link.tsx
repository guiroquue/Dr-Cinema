import React from "react";
import { Pressable, Text, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";

export function normalizeWebsite(url?: string | null) {
  const trimmed = (url ?? "").trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function openUrl(url: string) {
  if (!url) return;
  try {
    const can = await Linking.canOpenURL(url);
    if (can) await Linking.openURL(url);
  } catch {}
}

type WebsiteLinkProps = {
  url?: string | null;
  label?: string;
  theme?: typeof Colors.default;
};

export function WebsiteLink({ url, label, theme = Colors.default }: WebsiteLinkProps) {
  if (!url) return null;
  const normalizedUrl = normalizeWebsite(url);
  const displayLabel = label ?? url;

  return (
    <Pressable
      hitSlop={10}
      onPress={(e) => {
        e.stopPropagation();
        openUrl(normalizedUrl);
      }}
      style={[styles.websiteBtn]}
    >
      <Ionicons name="globe-outline" size={16} color={theme.primary} />
      <Text style={[styles.websiteLabel, { color: theme.primary }]} numberOfLines={1}>
        {displayLabel}
      </Text>
      <Ionicons name="open-outline" size={16} color={theme.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  websiteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  websiteLabel: {
    flex: 1,
    fontSize: 16,
    marginBottom: 2,
    fontFamily: Fonts.body.semibold,
  },
});
