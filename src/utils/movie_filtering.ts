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
    return true;
  });
}
