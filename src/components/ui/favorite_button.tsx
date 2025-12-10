import { Pressable, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/favorites_slice";
import { saveFavorites } from "@/utils/favorite_movies";
import type { Movie } from "@/types/movie";

type Props = { movie: Movie };

export default function FavoriteButton({ movie }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(s => s.favorites.items);

  const imdbId = movie.ids?.imdb;
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
        backgroundColor: isFavorite ? "#ff4d4d" : "#4CAF50",
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Text>
    </Pressable>
  );
}
