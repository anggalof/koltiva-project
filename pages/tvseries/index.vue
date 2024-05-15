<script lang="ts" setup>
import {
  useAddFavorite,
  useDiscoverTVSeries,
  useFavoriteMovies,
  useTVGenres,
} from "~/composables/useMovies";
import type { TMovies, TMovie, TFavorite, TGenre } from "~/types/Movies";

const discoverTVSeries = ref<TMovies[]>([]);
const isLoadingTVSeries = ref<boolean>(false);
const favoriteMovies = ref<TMovies[]>([]);
const isLoadingFav = ref<boolean>(false);
const currentPage = ref<number>(1);

const isGenre = ref<string>("");
const isShowLoadMore = ref<boolean>(true);

const loadDiscoverTVSeriesData = async (genre: string) => {
  isLoadingTVSeries.value = true;
  const data = await useDiscoverTVSeries(currentPage.value, genre);
  if (data) {
    isLoadingTVSeries.value = false;
  }
  return data;
};

const movies = (await loadDiscoverTVSeriesData(isGenre.value)) as TMovie;
discoverTVSeries.value = movies?.results;

const onLoadFavoriteMovies = async () => {
  const favorite = (await useFavoriteMovies()) as TFavorite;
  favoriteMovies.value = favorite?.results;
  isLoadingFav.value = false;
};

const handleAddFavorite = async (id: number, type: boolean) => {
  isLoadingFav.value = true;
  const payload = {
    media_type: "movie",
    media_id: id,
    favorite: type,
  };
  await useAddFavorite(payload);
  onLoadFavoriteMovies();
};

const handleLoadMore = async () => {
  currentPage.value++;
  const newData = (await loadDiscoverTVSeriesData(isGenre.value)) as TMovie;
  const data = await newData.results;
  discoverTVSeries.value = [...discoverTVSeries.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: number) => {
  isGenre.value = id.toString();
  const newData = (await loadDiscoverTVSeriesData(isGenre.value)) as TMovie;
  const data = await newData.results;
  discoverTVSeries.value = data;

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const favorite = (await useFavoriteMovies()) as TFavorite;
const genreList = (await useTVGenres()) as TGenre;
favoriteMovies.value = favorite?.results;
</script>

<template>
  <CommonMainSection
    title="TV Series"
    :discover="discoverTVSeries"
    :favorite="favoriteMovies"
    :genres="genreList.genres"
    :loading="isLoadingFav"
    :placeholder="isLoadingTVSeries"
    :show="isShowLoadMore"
    @click="handleFilterAction"
    @change="handleAddFavorite"
    @load="handleLoadMore"
  />
</template>
