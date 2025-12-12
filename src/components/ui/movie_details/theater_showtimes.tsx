import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

type Showtime = {
  cinema?: {
    name?: string;
  };
  cinema_name?: string;
  schedule: {
    time: string;
    purchase_url?: string;
    info?: string;
  }[];
};

interface Props {
  showtimes: Showtime[];
  theaterName?: string;
}

export default function TheaterShowtimes({ showtimes, theaterName }: Props) {
  const theme = Colors.default;

  const filtered = useMemo(() => {
    if (!theaterName) return [];

    return showtimes.filter(
      (s) =>
        s.cinema?.name === theaterName ||
        s.cinema_name === theaterName
    );
  }, [showtimes, theaterName]);

  if (!filtered.length) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.secondary }]}>
        Showtimes · {theaterName}
      </Text>

      <View style={styles.timesRow}>
        {filtered.map((s, i) =>
          s.schedule.map((slot, j) => {
            const time = slot.time.split(" ")[0]; // "11:00 (2)" → "11:00"
            const disabled = !slot.purchase_url;

            return (
              <Pressable
                key={`${i}-${j}`}
                disabled={disabled}
                onPress={() => {
                  if (slot.purchase_url) Linking.openURL(slot.purchase_url);
                }}
                style={({ pressed }) => [
                  styles.timePill,
                  { backgroundColor: theme.primary },
                  (pressed || disabled) && { opacity: 0.65 },
                  disabled && { opacity: 0.4 },
                ]}
              >
                <Text style={[styles.timeText, { color: theme.secondary }]}>
                  {time}
                </Text>
              </Pressable>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.heading.bold,
    marginBottom: 12,
  },
  timesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 14,
    fontFamily: Fonts.body.semibold,
  },
});
