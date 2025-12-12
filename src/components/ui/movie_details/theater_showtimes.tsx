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

  const today = new Date();

  const nowMinutes =
    today.getHours() * 60 + today.getMinutes();

  const dateLabel = today.toLocaleDateString("is-IS", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const grouped = [
    {
      dateLabel,
      items: filtered,
    },
  ];

  if (!filtered.length) return null;

  const extractLanguageLabel = (raw: string, info?: string) => {
    const upper = raw.toUpperCase();

    if (upper.includes("ÍSL")) return "ÍSL";
    if (upper.includes("ISL")) return "ÍSL";
    if (upper.includes("EN")) return "EN";

    if (info?.toUpperCase().includes("ÍSL")) return "ÍSL";
    if (info?.toUpperCase().includes("EN")) return "EN";

    return null;
  };

  const getOrderedFutureTimes = (
    schedules: {
      time: string;
      purchase_url?: string;
      info?: string;
    }[]
  ) => {
    return schedules
      .map((slot) => {
        const rawTime = slot.time;
        const time = rawTime.split(" ")[0]; // "21:00 (EN TAL L)" → "21:00"
        const [h, m] = time.split(":").map(Number);
        const minutes = h * 60 + m;

        return {
          ...slot,
          time,
          minutes,
          label: extractLanguageLabel(rawTime, slot.info),
        };
      })
      .filter((slot) => slot.minutes > nowMinutes)
      .sort((a, b) => a.minutes - b.minutes)
      .filter(
        (slot, index, arr) =>
          arr.findIndex((s) => s.time === slot.time) === index
      );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.secondary }]}>
        Sýningar · {theaterName}
      </Text>

      {grouped.map((group, gi) => (
        <View key={gi} style={styles.dayGroup}>
          <Text style={[styles.dayTitle, { color: theme.secondary }]}>
            {group.dateLabel}
          </Text>

          <View style={styles.timesRow}>
            {getOrderedFutureTimes(
              group.items.flatMap((s) => s.schedule)
            ).map((slot, j) => {
              const disabled = !slot.purchase_url;

              return (
                <Pressable
                  key={`${gi}-${j}`}
                  disabled={disabled}
                  onPress={() => {
                    if (slot.purchase_url) Linking.openURL(slot.purchase_url);
                  }}
                  style={({ pressed }) => [
                    styles.timePill,
                    { backgroundColor: "#4894ff3f" },
                    (pressed || disabled) && { opacity: 0.65 },
                    disabled && { opacity: 0.4 },
                  ]}
                >
                  <View style={styles.timeContent}>
                    <Text style={[styles.timeText, { color: theme.secondary }]}>
                      {slot.time}
                    </Text>

                    {slot.label && (
                      <View style={styles.langPill}>
                        <Text style={styles.langText}>{slot.label}</Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
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
    borderRadius: 12,
  },
  timeText: {
    fontSize: 16,
    fontFamily: Fonts.body.semibold,
  },
  dayGroup: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 16,
    fontFamily: Fonts.body.semibold,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  timeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  langPill: {
    backgroundColor: Colors.default.action,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  langText: {
    fontSize: 11,
    fontFamily: Fonts.body.semibold,
    color: "#fff",
  },
});
