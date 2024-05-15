export interface TMovies {
  id: number;
  media_type: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  profile_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  name: string;
  character: string;
  video: string;
  vote_average: any;
  vote_rate: number;
}

export interface TMovie {
  results: TMovies[];
  page: number;
  total_pages: number;
}

export interface TGenres {
  id: number;
  name: string;
}

export interface TGenre {
  genres: TGenres[];
}
export interface TMovieDetail {
  genres: TGenres[];
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface TPayloadFavorite {
  media_type: string,
  media_id: number,
  favorite: boolean,
}

export interface TVideos {
  key: string;
  name: string;
}
export interface TVideo {
  results: TVideos[]
}

export interface TCast {
  cast: TMovies[];
}

export interface TRecommendation {
  results: TMovies[]
}

export interface TFavorite {
  results: TMovies[]
}
