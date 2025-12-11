import { View, Text, StyleSheet, Platform } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

type TrailerResult = {
  id?: string;
  key?: string;
  name?: string;
  type?: string;
  site?: string;
};

export default function TrailersList({ item }: any) {
  if (!item?.trailers) return <Text style={styles.none}>No trailers available.</Text>;

  // Typed extraction
  const trailers: TrailerResult[] = item.trailers
    .flatMap((t: any) => t.results ?? [])
    .filter((r: any) => r.site === "YouTube" && r.type === "Trailer");

  // Typed unique map
  const unique = new Map<string, TrailerResult>();
  trailers.forEach((t: TrailerResult) => {
    const key = t.key || t.id;
    if (key && !unique.has(key)) unique.set(key, t);
  });

  const list = Array.from(unique.values());

  if (list.length === 0) {
    return <Text style={styles.none}>No YouTube trailers found.</Text>;
  }

  return (
    <View>
      {list.map((t) => {
        const key = t.key || t.id;
        return (
          <View key={key}>
            {Platform.OS !== "web" && (
              <YoutubePlayer
                height={220}
                width={"100%"}
                play={false}
                videoId={key}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  none: {
    fontSize: 16,
    marginTop: 12,
  },
});
