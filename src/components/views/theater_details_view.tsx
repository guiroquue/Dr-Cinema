import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import type { Theater } from "@/types/theatre";
import { useAppSelector } from "@/store/hooks";
import { Colors, Fonts } from "@/constants/theme";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { WebsiteLink, normalizeWebsite } from "../ui/theater_website_link";
import { LinearGradient } from "expo-linear-gradient";

function openMaps(address: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  Linking.openURL(url).catch(() => {});
}

function makeCall(number: string) {
  const url = `tel:${number}`;
  Linking.openURL(url).catch(() => {});
}

function stripHtml(html?: string | null) {
  const s = (html ?? "").trim();
  if (!s) return "—";
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function TheaterDetails() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const theaterId = Array.isArray(id) ? id[0] : id;
  const insets = useSafeAreaInsets();

  const loading = useAppSelector((s) => s.theaters.loading);
  const error = useAppSelector((s) => s.theaters.error);
  const theater = useAppSelector((s) =>
    theaterId ? (s.theaters.byId[theaterId] as Theater | undefined) : undefined
  );

  if (!theaterId) {
    return <Text style={styles.msg}>Missing theater id.</Text>;
  }

  if (loading && !theater) {
    return <Text style={styles.msg}>Loading…</Text>;
  }

  if (error && !theater) {
    return <Text style={styles.msg}>Error: {error}</Text>;
  }

  if (!theater) {
    return <Text style={styles.msg}>No theater found.</Text>;
  }

  const address = [theater.address, theater.city].filter(Boolean).join(", ") || "—";
  const descriptionRaw = theater.description;
  const description = descriptionRaw ? stripHtml(descriptionRaw) : null;
  const website = (theater.website ?? "").trim();
  const websiteUrl = website ? normalizeWebsite(website) : null;


  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.default.background }]}>
      <View>
        <Text style={styles.title}>{theater.name.replace(",", "") ?? "—"}</Text>

        <View style={styles.awesome_stuff}>
          {address ? (
            <Pressable onPress={() => openMaps(address)}>
              <Text style={[styles.details, { textDecorationLine: "underline" }]}>{address}</Text>
            </Pressable>
          ) : (
            <Text style={styles.details}>Staðsetning ekki skráð</Text>
          )}

          {theater.phone ? (
            <Pressable onPress={() => makeCall(theater.phone)}>
              <Text style={[styles.details, { textDecorationLine: "underline" }]}>{theater.phone}</Text>
            </Pressable>
          ) : (
            <Text style={styles.details}></Text>
          )}
        </View>

        <Text style={styles.description}>{description ?? "Lýsing ekki skráð"}</Text>
        <View style={styles.websiteLink}>
          {websiteUrl && <WebsiteLink url={websiteUrl} label={website} />}
        </View>
        
      </View>
      <LinearGradient
        colors={[Colors.default.background + "00", Colors.default.background]}
        style={{ position: "absolute", bottom: 64, left: 0, right: 0, height: insets.bottom + 32, zIndex: 10 }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[Colors.default.background, Colors.default.background + "00"]}
        style={{ position: "absolute", top: 12, left: 0, right: 0, height: insets.top - 26, zIndex: 10 }}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: -32,
  },
  msg: { padding: 12 },
  container: { 
    padding: 12, 
    paddingBottom: 24, 
  },
  details: { 
    gap: 10, 
    fontSize: 16,
    fontFamily: Fonts.body.semibold,
  },
  title: { 
    fontSize: 36, 
    fontFamily: Fonts.heading.black
  },
  description: {
    marginVertical: 12,
    lineHeight: 20,

  },
  awesome_stuff: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  websiteLink: {
    backgroundColor: Colors.default.secondary,
    padding: 12,
    fontSize: 16,
    fontFamily: Fonts.body.semibold,
    color: Colors.default.primary,
    borderRadius: 12,
  },
});
