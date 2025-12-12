import { View, Text, Image, ScrollView, StyleSheet, Pressable, Share } from "react-native";
import { Fonts, Colors } from "@/constants/theme";
import FavoriteButton from "@/components/ui/movie_details/favorite_button";
import TrailersList from "@/components/ui/movie_details/trailers_list";
import { Ionicons } from "@expo/vector-icons";

import RottenTomatoesIcon from "@/assets/icons/rotten_tomatoes.svg";
import MovieReviews from "./movie_review";
import TheaterShowtimes from "./theater_showtimes";
import { useLocalSearchParams } from "expo-router";


export default function MovieInfo({
  item,
  posterUrl,
  type,
}: {
  item: any;
  posterUrl: string | null;
  type: "movie" | "upcoming";
}) {
  const omdb = item?.omdb?.[0] ?? {};

  const { theater } = useLocalSearchParams<{ theater?: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.section}>
        {posterUrl && (
          <View style={styles.posterWrapper}>
            <Image
              source={{ uri: posterUrl }}
              resizeMode="cover"
              style={styles.poster}
            />

            <View style={styles.posterActions}>
              <FavoriteButton movie={item} type={type} />
              <Pressable
                onPress={() => {
                  Share.share({
                    title: item?.title ?? "Dr. Bíó",
                    message: item?.title ?? "",
                  });
                }}
                style={({ pressed }) => [
                  {
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.45)",
                  },
                  pressed && { transform: [{ scale: 0.95 }] },
                ]}
              >
                <Ionicons name="share-outline" size={22} color="#fff" />
              </Pressable>
            </View>
          </View>
        )}

        <Text style={styles.title}>{item?.title ?? "Óþekktur titill"}</Text>
        <View style={styles.genreBadgeContainer}>
          <View style={styles.genreBadge}>
              <Text style={styles.genreBadgeText}>{item?.year ?? "—"}</Text>
              </View>
              <View style={styles.genreBadge}>
              <Text style={styles.genreBadgeText}>{omdb?.Runtime ?? "Lengd óþekt"}</Text>
              </View>
              {item.genres?.map((g: any) => (
                <View key={g.ID} style={styles.genreBadge}>
                  <Text style={styles.genreBadgeText}>{g.Name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.badgeContainer}>
          <View style={styles.pgBadge}>
            <Text style={styles.pgLogo}>PG</Text>
            <Text style={styles.badgeText}>{omdb.Rated ?? "N/A"}</Text>
          </View>

          <View style={styles.imdbBadge}>
            <Ionicons name="star" size={20} color={"#F5C518"} />
            <Text style={styles.badgeText}>{omdb.imdbRating ?? "N/A"}</Text>
          </View>

          <View style={styles.tomatoBadge}>
            <RottenTomatoesIcon width={20} height={20} />
            <Text style={styles.badgeText}>
              {
                omdb.Ratings?.find((r: any) => r.Source === "Rotten Tomatoes")
                  ?.Value ?? "N/A"
              }
            </Text>
          </View>
        </View>

        <Text style={styles.bodyText}>{item?.plot ?? "Enginn söguþráður tiltækur."}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Leikarar: </Text>
          <Text style={styles.detailValue}>{omdb.Actors ?? "N/A"}</Text>
        </Text>

        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Leikstjóri: </Text>
          <Text style={styles.detailValue}>{omdb.Director ?? "N/A"}</Text>
        </Text>

        <Text style={styles.detailRow}>
          <Text style={styles.detailLabel}>Handritshöfundar: </Text>
          <Text style={styles.detailValue}>{omdb.Writer ?? "N/A"}</Text>
        </Text>
      </View>

      <TheaterShowtimes
        showtimes={item.showtimes}
        theaterName={theater}
      />

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Trailers</Text>
        <TrailersList item={item} />
      </View>

      <MovieReviews imdbId={item.ids.imdb} />
    </ScrollView>
  );
}

const purple = "#9b5de5";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  section: {
    marginBottom: 28,
  },

  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    marginBottom: 14,
  },

  posterWrapper: {
    position: "relative",
  },

  posterActions: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 6,
    borderRadius: 100,
  },

  title: {
    fontFamily: Fonts.heading.black,
    fontSize: 32,
  },

  subText: {
    marginLeft: 12,
  },

  sectionHeader: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  bodyText: {
    fontSize: 16,
    lineHeight: 18,
    marginTop: 18,
  },

  // Text-related styles
  detailRow: {
    fontSize: 16,
    marginBottom: 6,
  },
  detailLabel: {
    fontFamily: Fonts.body.semibold,
  },
  detailValue: {
    fontFamily: Fonts.body.regular,
  },

  /* GENRE BADGES */
  genreBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 4,
  },

  genreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.default.secondary + "20",
    borderWidth: 0.2,
    borderColor: Colors.default.secondary,
  },

  genreBadgeText: {
    fontFamily: Fonts.body.semibold,
    fontSize: 12,
  },

  badgeContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    flexWrap: "wrap",
  },

  badgeText: {
    fontFamily: Fonts.body.semibold,
    marginLeft: 8,
  },

  imdbBadge: {
    borderWidth: 0.2,
    borderColor: "#F5C518",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5b31930",
  },

  tomatoBadge: {
    borderWidth: 0.2,
    borderColor: Colors.default.action,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.default.action + "20",
  },

  pgBadge: {
    borderWidth: 0.2,
    borderColor: purple,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: purple + "20",
  },

  pgLogo: {
    color: purple,
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: purple,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: Fonts.body.semibold,
  },
});
