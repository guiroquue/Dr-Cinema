// utils/onShareMovie.ts
import { Share } from "react-native";
import { buildShareUrl } from "@/utils/linking"; // or "@/utils/buildShareUrl" depending on your path

type ShareMovieItem = {
  title?: string;
  name?: string;
  plot?: string;
  overview?: string;
};

export default async function onShareMovie(
  item: ShareMovieItem | null,
  resolvedImdbId: string,
  resolvedType: string | null,
  isUpcoming: boolean
) {
  if (!item || !resolvedImdbId) return;

  const title = item.title || item.name || "Mynd";
  const overview = item.plot || item.overview || "";

  const typeParam = resolvedType ?? (isUpcoming ? "upcoming" : "movie");

  const url = buildShareUrl(resolvedImdbId, typeParam);

  const message = `${title}\n\n${overview}\n\nOpen in the app: ${url}`;

  try {
    await Share.share({ message });
  } catch (e) {
    console.error("Share error", e);
  }
}
