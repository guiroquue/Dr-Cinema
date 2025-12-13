import { Share } from "react-native";

export type FavoriteMovie = {
  imdbId: string;
  title: string;
  "release-dateIS"?: string;
  genres?: { Name?: string }[];
};

export async function shareFavorites(favorites: FavoriteMovie[]) {
  if (!favorites || favorites.length === 0) return;

  try {
    const message = favorites
      .map((f, i) => {
        const dateText = f["release-dateIS"] ? `, Útgáfudagur: ${f["release-dateIS"]}` : "";
        const genreText =
          f.genres && f.genres.length > 0
            ? `, Tegund: ${f.genres.map((g) => g.Name ?? "Óþekkt").join(", ")}`
            : "";
        return `${i + 1}. ${f.title}${dateText}${genreText}`;
      })
      .join("\n");

    await Share.share({
      message: `Uppáhalds kvikmyndir mínar:\n\n${message}`,
    });
  } catch (error) {
    console.error("Error sharing favorites:", error);
  }
}
