export function sortByReleaseDate(movies: any[]) {
  return [...movies].sort((a, b) => {
    const da = new Date(a["release-dateIS"] ?? a.year);
    const db = new Date(b["release-dateIS"] ?? b.year);
    return da.getTime() - db.getTime();
  });
}
