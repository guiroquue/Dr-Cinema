import * as Linking from "expo-linking";

export function buildShareUrl(imdbId: string, type: string) {
  return Linking.createURL("movie_details", {
    queryParams: {
      imdbId,
      type,
    },
  });
}

