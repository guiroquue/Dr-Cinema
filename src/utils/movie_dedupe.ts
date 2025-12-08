export function dedupeByImdb(movies: any[]) {
  const seen = new Set<string>();
  const result: any[] = [];

  for (const movie of movies) {
    const imdb = movie?.ids?.imdb;

    // Keep movies without IMDB IDs (rare but valid)
    if (!imdb) {
      result.push(movie);
      continue;
    }

    if (!seen.has(imdb)) {
      seen.add(imdb);
      result.push(movie);
    }
  }

  return result;
}
