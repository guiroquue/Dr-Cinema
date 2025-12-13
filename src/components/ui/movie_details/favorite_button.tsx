import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/favorites_slice";
import { saveFavorites } from "@/utils/favorite_movies";
import type { Movie } from "@/types/movie";
import { Colors } from "@/constants/theme";

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
      style={({ pressed }) => [
        {
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isFavorite
            ? Colors.default.action
            : "rgba(0,0,0,0.45)",
        },
        pressed && { transform: [{ scale: 0.95 }] },
      ]}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={22}
        color="#fff"
      />
    </Pressable>
  );
}
