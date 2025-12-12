export interface MovieIds {
  imdb: string | null;
  rotten: string | null;
  tmdb: string | null;
}

export interface MovieGenre {
  ID: number;
  Name: string;
  NameEN?: string;
}

export interface AbridgedPerson {
  name: string;
}

export interface TrailerResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface Trailer {
  id: number;
  results: TrailerResult[];
}

export interface OmdbEntry {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Type: string;
  [key: string]: any; // API includes many fields we don’t need to enumerate
}

export interface Cinema {
  id: number;
  name: string;
}

export interface ShowtimeSlot {
  time: string;
}

export interface Showtime {
  cinema: Cinema;
  schedule: ShowtimeSlot[];
}

export interface Movie {
  _id: string;
  id: number;
  ids: MovieIds;
  title: string;
  alternativeTitles: string;
  year: string;
  "release-dateIS": string;
  genres: MovieGenre[];
  actors_abridged: AbridgedPerson[];
  directors_abridged: AbridgedPerson[];
  trailers: Trailer[];
  omdb: OmdbEntry[];
  plot: string;
  poster: string;
  showtimes?: Showtime[];
}
