import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import type { Theater } from "@/types/theatre";

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
  const { theater } = useLocalSearchParams<{ theater?: string | string[] }>();
  const raw = Array.isArray(theater) ? theater[0] : theater;

  const t = useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Theater;
    } catch {
      return null;
    }
  }, [raw]);

  if (!t) return <Text style={styles.msg}>Missing/invalid theater data.</Text>;

  const address = [t.address, t.city].filter(Boolean).join(", ") || "—";
  const description = stripHtml(t.description);
  const mapHtml = (t.google_map ?? "").trim();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t.name ?? "—"}</Text>

        <Field label="Address" value={address} />
        <Field label="Phone" value={t.phone ?? "—"} />
        <Field label="Website" value={t.website ?? "—"} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  msg: { padding: 12 },
  container: { padding: 12, paddingBottom: 24 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 10 },
  title: { fontSize: 18, fontWeight: "700" },
  field: { gap: 3 },
  label: { fontSize: 12, fontWeight: "600", opacity: 0.7 },
  value: { fontSize: 13 },
});
