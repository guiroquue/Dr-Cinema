export function filterUpcoming(movies: any[]) {
  const today = new Date();

  return movies.filter((m) => {
    const raw = m["release-dateIS"] ?? m.year;

    // Defensive: skip movies with no usable date
    if (!raw) return false;

    const date = new Date(raw);

    // Keep only movies with release date in the future
    return date.getTime() >= today.getTime();
  });
}
