<script lang="ts" setup>
import { ref } from "vue";
import {
  useAddFavorite,
  useDiscoverMovies,
  useFavoriteMovies,
  useGenres,
} from "~/composables/useMovies";
import type { TMovie, TMovies, TGenre, TFavorite } from "~/types/Movies";

const isLoadingMovie = ref<boolean>(false);
const discoverMovies = ref<TMovies[]>([]);
const favoriteMovies = ref<TMovies[]>([]);
const isLoadingFav = ref<boolean>(false);
const currentPage = ref<number>(1);

const isGenre = ref<string>("");
const isShowLoadMore = ref<boolean>(true);

const loadDiscoverData = async (genre: string) => {
  isLoadingMovie.value = true;
  const data = await useDiscoverMovies(currentPage.value, genre);
  if (data) {
    isLoadingMovie.value = false;
  }
  return data;
};

const movies = (await loadDiscoverData(isGenre.value)) as TMovie;
discoverMovies.value = movies?.results;

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
  const newData = (await loadDiscoverData(isGenre.value)) as TMovie;
  const data = await newData.results;
  discoverMovies.value = [...discoverMovies.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: number) => {
  isGenre.value = id.toString();
  const newData = (await loadDiscoverData(isGenre.value)) as TMovie;
  const data = await newData.results;
  discoverMovies.value = data;

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const favorite = (await useFavoriteMovies()) as TFavorite;
const genreList = (await useGenres()) as TGenre;
favoriteMovies.value = favorite?.results;
</script>

<template>
  <CommonMainSection
    title="Movies"
    :discover="discoverMovies"
    :favorite="favoriteMovies"
    :genres="genreList.genres"
    :loading="isLoadingFav"
    :placeholder="isLoadingMovie"
    :show="isShowLoadMore"
    @click="handleFilterAction"
    @change="handleAddFavorite"
    @load="handleLoadMore"
  />
</template>
