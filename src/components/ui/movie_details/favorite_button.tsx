import { Pressable, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/favorites_slice";
import { saveFavorites } from "@/utils/favorite_movies";
import type { Movie } from "@/types/movie";
import { Fonts, Colors } from "@/constants/theme";

type Props = { movie: Movie; type: "movie" | "upcoming" };

export default function FavoriteButton({ movie, type }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(s => s.favorites.items);

  const imdbId = movie.ids?.imdb || movie.omdb?.[0]?.imdbID;
  const isFavorite = imdbId ? favorites.some(f => f.imdbId === imdbId) : false;

  const handlePress = async () => {
    if (!imdbId) return;

    if (isFavorite) {
      dispatch(removeFavorite(imdbId));
      await saveFavorites(favorites.filter(f => f.imdbId !== imdbId));
    } else {
      const fav = {
        imdbId,
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        directors_abridged: movie.directors_abridged,
        actors_abridged: movie.actors_abridged,
        genres: movie.genres,
        omdb: movie.omdb?.map(o => ({ Rated: o.Rated })) || [],
        "release-dateIS": movie["release-dateIS"],
        plot: movie.plot,
        type,
      };
      dispatch(addFavorite(fav));
      await saveFavorites([...favorites, fav]);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        padding: 12,
        marginTop: 16,
        backgroundColor: isFavorite ? Colors.default.secondary : Colors.default.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.default.secondary
      }}
    >
      <Text style={{ color: isFavorite ? Colors.default.background : Colors.default.secondary, fontFamily: Fonts.body.semibold }}>
        {isFavorite ? "Eyða við uppáhalds" : "Bæta við uppáhalds"}
      </Text>
    </Pressable>
  );
}
