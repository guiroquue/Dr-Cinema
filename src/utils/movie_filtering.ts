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

export function applyMovieFilters(movies: Movie[], filters: MovieFilter): Movie[] {
  return movies.filter((m) => {
    if (filters.title && !m.title.toLowerCase().includes(filters.title.toLowerCase())) return false;

    if (filters.actors && !peopleToString(m.actors_abridged).toLowerCase().includes(filters.actors.toLowerCase()))
      return false;

    if (filters.directors && !peopleToString(m.directors_abridged).toLowerCase().includes(filters.directors.toLowerCase()))
      return false;

    if (filters.pgRating && m.omdb[0]?.Rated !== filters.pgRating) return false;

    const imdbRating = m.omdb[0]?.imdbRating ? Number(m.omdb[0].imdbRating) : undefined;
    if (filters.imdb?.min && imdbRating !== undefined && imdbRating < Number(filters.imdb.min)) return false;
    if (filters.imdb?.max && imdbRating !== undefined && imdbRating > Number(filters.imdb.max)) return false;

    const rottenRatingStr = m.omdb[0]?.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;
    const rottenRating = rottenRatingStr ? Number(rottenRatingStr.replace("%", "")) : undefined;
    if (filters.rotten?.min && rottenRating !== undefined && rottenRating < Number(filters.rotten.min)) return false;
    if (filters.rotten?.max && rottenRating !== undefined && rottenRating > Number(filters.rotten.max)) return false;

    if (filters.showtime?.from || filters.showtime?.to) {
      // optional: implement showtime logic if you have the field
    }

    return true;
  });
}
