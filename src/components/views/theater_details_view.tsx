import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import type { Theater } from "@/types/theatre";
import { useAppSelector } from "@/store/hooks";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";


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

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{(value ?? "").trim() || "—"}</Text>
    </View>
  );
}

export default function TheaterDetails() {
  // now we only pass `id` from the list:
  // router.push({ pathname: "/theater_details", params: { id: String(item.id) } })
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const theaterId = Array.isArray(id) ? id[0] : id;

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
  const description = stripHtml(theater.description);
  const mapHtml = (theater.google_map ?? "").trim();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.default.background }]}>
      <View style={styles.card}>
        <Text style={styles.title}>{theater.name ?? "—"}</Text>

        <Field label="Address" value={address} />
        <Field label="Phone" value={theater.phone ?? "—"} />
        <Field label="Website" value={theater.website ?? "—"} />
        <Field label="Description" value={description} />

        {!!mapHtml && (
          <View style={{ height: 260, overflow: "hidden", borderRadius: 12 }}>
            <WebView
              originWhitelist={["*"]}
              source={{
                html: `<!doctype html><html><head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head><body style="margin:0;padding:0;">${mapHtml}</body></html>`,
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },
  msg: { padding: 12 },
  container: { padding: 12, paddingBottom: 24, },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 10, backgroundColor: Colors.default.background },
  title: { fontSize: 18, fontWeight: "700" },
  field: { gap: 3 },
  label: { fontSize: 12, fontWeight: "600", opacity: 0.7 },
  value: { fontSize: 13 },
});
