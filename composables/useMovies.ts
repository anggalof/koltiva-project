import type { TPayloadFavorite } from "~/types/Movies";

const discoverUrl = "/api/discover";
const favoriteUrl = "/api/account/8244407/favorite";
const movieUrl = "/api/movie";
const tvSeriesUrl = "/api/tv";
const genreUrl = "/api/genre";
const searchUrl = "/api/search/movie";

export const useSearchMovies = async (keyword: string = '') => {
  const { data } = await useAPI(`${searchUrl}?query=${keyword}`);
  return data.value;
};

export const useDiscoverMovies = async (page: number, genre: string = '') => {
  const { data } = await useAPI(`${discoverUrl}/movie?page=${page}&with_genres=${genre}`);
  return data.value;
};

export const useDiscoverTVSeries = async (page: number, genre: string = '') => {
  const { data } = await useAPI(`${discoverUrl}/tv?page=${page}&with_genres=${genre}`);
  return data.value;
};

export const useTVPopularMovies = async (page: number) => {
  const { data } = await useAPI(`${tvSeriesUrl}/popular?page=${page}`);
  return data.value;
};

export const usePopularMovies = async (page: number) => {
  const { data } = await useAPI(`${movieUrl}/popular?page=${page}`);
  return data.value;
};

export const useFavoriteMovies = async () => {
  const { data } = await useAPI(`${favoriteUrl}/movies`);
  return data.value;
};

export const useGenres = async () => {
  const { data } = await useAPI(`${genreUrl}/movie/list`);
  return data.value;
};

export const useTVGenres = async () => {
  const { data } = await useAPI(`${genreUrl}/tv/list`);
  return data.value;
};

export const useAddFavorite = async (payload: TPayloadFavorite) => {
  const data = await useAPI(`${favoriteUrl}`, {
    method: 'POST',
    headers: {
      'Append': 'application/json',
      'Content-Type': 'application/json'
    },
    body: payload
  });
  return data;
};

export const useMovieById = async (id: string | string[]) => {
  const { data } = await useAPI(`${movieUrl}/${id}`);
  return data.value;
};

export const useMovieVideoById = async (id: string | string[]) => {
  const { data } = await useAPI(`${movieUrl}/${id}/videos`);
  return data.value;
};

export const useMovieCast = async (id: string | string[]) => {
  const { data } = await useAPI(`${movieUrl}/${id}/credits`);
  return data.value;
}

export const useMovieRecommendation = async (id: string | string[]) => {
  const { data } = await useAPI(`${movieUrl}/${id}/recommendations`);
  return data.value;
}
