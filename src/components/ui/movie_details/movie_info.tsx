import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Fonts, Colors } from "@/constants/theme";
import FavoriteButton from "@/components/ui/movie_details/favorite_button";
import TrailersList from "@/components/ui/movie_details/trailers_list";
import { Ionicons } from "@expo/vector-icons";

import RottenTomatoesIcon from "@/assets/icons/rotten_tomatoes.svg";


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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* FAVORITE */}
      <View style={styles.section}>
       <FavoriteButton
        movie={item}
        type={type}
      />
      </View>

      {/* OVERVIEW */}
      <View style={styles.section}>
        {posterUrl && (
          <Image source={{ uri: posterUrl }} resizeMode="cover" style={styles.poster} />
        )}

        <Text style={styles.title}>{item?.title ?? "Óþekktur titill"}</Text>
        <View style={styles.genreBadgeContainer}>
          <View style={styles.genreBadge}>
              <Text style={styles.genreBadgeText}>{item?.year ?? "—"}</Text>
          </View>
          {item.genres?.map((g: any) => (
            <View key={g.ID} style={styles.genreBadge}>
              <Text style={styles.genreBadgeText}>{g.Name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.bodyText}>{item?.plot ?? "Enginn söguþráður tiltækur."}</Text>
      </View>

      {/* CAST & CREW */}
      <View style={styles.section}>
        <Text style={styles.castMain}>{omdb.Actors ?? ""}</Text>
        <Text style={styles.detailRow}>Leikstjóri: {omdb.Director ?? "N/A"}</Text>
        <Text style={styles.detailRow}>Handritshöfundar: {omdb.Writer ?? "N/A"}</Text>
      </View>

      {/* DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upplýsingar</Text>

        <Text style={styles.detailRow}>Lengd: {omdb.Runtime ?? "N/A"}</Text>

        <View style={styles.badgeContainer}>
          {/* PG BADGE */}
          <View style={styles.pgBadge}>
            <Text style={styles.pgLogo}>PG</Text>
            <Text style={styles.badgeText}>{omdb.Rated ?? "N/A"}</Text>
          </View>

          {/* IMDb */}
          <View style={styles.imdbBadge}>
            <Ionicons name="star" size={20} color={"#F5C518"} />
            <Text style={styles.badgeText}>{omdb.imdbRating ?? "N/A"}</Text>
          </View>

          {/* Rotten Tomatoes */}
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
      </View>

      {/* TRAILERS */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Trailers</Text>
        <TrailersList item={item} />
      </View>
    </ScrollView>
  );
}

const purple = "#9b5de5";

const styles = StyleSheet.create({
  container: {
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
    fontSize: 14,
    lineHeight: 18,
  },

  detailRow: {
    fontSize: 16,
    marginBottom: 6,
  },

  castMain: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: Fonts.body.semibold,
  },

  /* GENRE BADGES */
  genreBadgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
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

  /* RATING BADGES */
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
