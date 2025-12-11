import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Fonts, Colors } from "@/constants/theme";
import FavoriteButton from "@/components/ui/movie_details/favorite_button";
import TrailersList from "@/components/ui/movie_details/trailers_list";

import RottenTomatoesIcon from "@/assets/icons/rotten_tomatoes.svg";

export default function MovieInfo({ item, posterUrl }: any) {
  const theme = Colors.default;
  const omdb = item?.omdb?.[0] ?? {};

  return (
    <ScrollView contentContainerStyle={styles.container}>

        {/* FAVORITE */}
      <View style={styles.section}>
        <FavoriteButton movie={item} />
      </View>

      {/* OVERVIEW */}
      <View style={styles.section}>
        {posterUrl && (
          <Image
            source={{ uri: posterUrl }}
            resizeMode="cover"
            style={styles.poster}
          />
        )}

        <Text style={styles.title}>{item?.title ?? "Óþekktur titill"}</Text>
        <Text style={styles.subText}>{item?.year ?? "—"}</Text>

        <Text style={styles.bodyText}>
          {item?.plot ?? "Enginn söguþráður tiltækur."}
        </Text>
      </View>

      {/* CAST & CREW */}
      <View style={styles.section}>
        <Text style={[styles.detailRow, {fontFamily: Fonts.body.semibold}]}>{omdb.Actors ?? ""}</Text>
        <Text style={styles.detailRow}>Leikstjóri: {omdb.Director ?? "N/A"}</Text>
        <Text style={styles.detailRow}>Handritshöfundar: {omdb.Writer ?? "N/A"}</Text>
      </View>

      {/* DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upplýsingar</Text>

        <Text style={styles.detailRow}>Lengd: {omdb.Runtime ?? "N/A"}</Text>
        <Text style={styles.detailRow}>Tegund: {omdb.Genre ?? "N/A"}</Text>
        <Text style={styles.detailRow}>Aldurstakmark: {omdb.Rated ?? "N/A"}</Text>

        <Text style={styles.detailRow}>
          IMDB einkunn: {omdb.imdbRating ?? "N/A"}
        </Text>

        <View>
            <RottenTomatoesIcon width={24} height={24} />
            <Text>
                {omdb.Ratings?.find((r: any) => r.Source === "Rotten Tomatoes")?.Value ?? "N/A"}
            </Text>
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
    fontSize: 18,
    opacity: 0.7,
    marginBottom: 16,
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
});
