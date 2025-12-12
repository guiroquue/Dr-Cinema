import type { Movie, AbridgedPerson } from "@/types/movie";

export interface MovieFilter {
  title?: string;
  actors?: string;
  directors?: string;
  pgRating?: string;
  imdb?: { min?: string; max?: string };
  rotten?: { min?: string; max?: string };
  showtime?: { from?: string; to?: string };
}

function peopleToString(people?: AbridgedPerson[]): string {
  return people?.map((p) => p.name).join(" ") || "";
}

function toMinutes(value: string): number | undefined {
  const s = (value ?? "").trim();
  if (!s) return undefined;

  // Extract first HH:mm found anywhere in the string (e.g., "14:00 (EN TAL)")
  const match = s.match(/(\d{1,2}):(\d{2})/);
  if (!match) return undefined;

  const h = Number(match[1]);
  const m = Number(match[2]);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return undefined;
  if (h < 0 || h > 23 || m < 0 || m > 59) return undefined;

  return h * 60 + m;
}

export function applyMovieFilters(movies: Movie[], filters: MovieFilter): Movie[] {
  return movies.filter((m) => {
    if (filters.title && !m.title.toLowerCase().includes(filters.title.toLowerCase())) return false;

    if (filters.actors && !peopleToString(m.actors_abridged).toLowerCase().includes(filters.actors.toLowerCase()))
      return false;

    if (filters.directors && !peopleToString(m.directors_abridged).toLowerCase().includes(filters.directors.toLowerCase()))
      return false;

    if (filters.pgRating && m.omdb[0]?.Rated?.toLowerCase() !== filters.pgRating.toLowerCase()) return false;

    const imdbRaw = m.omdb[0]?.imdbRating;
    const imdbRating = imdbRaw && !isNaN(Number(imdbRaw)) ? Number(imdbRaw) : undefined;

    const minImdb = filters.imdb?.min ? Number(filters.imdb.min) : undefined;
    const maxImdb = filters.imdb?.max ? Number(filters.imdb.max) : undefined;

    if (imdbRating !== undefined) {
      if (minImdb !== undefined && imdbRating < minImdb) return false;
      if (maxImdb !== undefined && imdbRating > maxImdb) return false;
    }

    if (imdbRating === undefined && (minImdb !== undefined || maxImdb !== undefined)) return false;


    const rottenStr = m.omdb[0]?.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;
    const rottenRating = rottenStr && !isNaN(Number(rottenStr.replace("%","")))
      ? Number(rottenStr.replace("%",""))
      : undefined;

    const minRotten = filters.rotten?.min ? Number(filters.rotten.min) : undefined;
    const maxRotten = filters.rotten?.max ? Number(filters.rotten.max) : undefined;

    if (rottenRating !== undefined) {
      if (minRotten !== undefined && rottenRating < minRotten) return false;
      if (maxRotten !== undefined && rottenRating > maxRotten) return false;
    }
    if (rottenRating === undefined && (minRotten !== undefined || maxRotten !== undefined)) return false;

    // Showtime filter (applies to TODAY only)
    const rawFrom = (filters.showtime?.from ?? "").trim();
    const rawTo = (filters.showtime?.to ?? "").trim();

    const fromMinutes = rawFrom ? toMinutes(rawFrom) : undefined;
    const toMinutesVal = rawTo ? toMinutes(rawTo) : undefined;

    // If user typed something but it's not a valid HH:mm, the filter is impossible → no matches.
    if (rawFrom && fromMinutes === undefined) return false;
    if (rawTo && toMinutesVal === undefined) return false;

    if (fromMinutes !== undefined || toMinutesVal !== undefined) {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      // If range is inverted (e.g. 22:00 → 18:00), treat as impossible for "today"
      if (
        fromMinutes !== undefined &&
        toMinutesVal !== undefined &&
        fromMinutes > toMinutesVal
      ) {
        return false;
      }

      const hasMatchingShowtimeToday = m.showtimes?.some((st) =>
        st.schedule?.some((slot) => {
          // Works for "14:00 (EN TAL)" and other formats
          const minutes = toMinutes(slot.time);
          if (minutes === undefined) return false;

          // Only upcoming showtimes today
          if (minutes <= nowMinutes) return false;

          if (fromMinutes !== undefined && minutes < fromMinutes) return false;
          if (toMinutesVal !== undefined && minutes > toMinutesVal) return false;

          return true;
        })
      );

      if (!hasMatchingShowtimeToday) return false;
    }

    return true;
  });
}
