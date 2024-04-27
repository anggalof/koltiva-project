<script lang="ts" setup>
import {
  useAddFavorite,
  useDiscoverTVSeries,
  useFavoriteMovies,
  useTVGenres,
} from "~/composables/useMovies";

const discoverTVSeries: any = ref([]);
const isLoadingTVSeries = ref<boolean>(false);
const favoriteMovies: any = ref({});
const isLoadingFav = ref<boolean>(false);
const currentPage = ref<number>(1);

const isGenre = ref<string>("");
const isShowLoadMore = ref<boolean>(true);

const loadDiscoverTVSeriesData = async (genre: string) => {
  isLoadingTVSeries.value = true;
  const data: any = await useDiscoverTVSeries(currentPage.value, genre);
  if (data) {
    isLoadingTVSeries.value = false;
  }
  return data;
};

const movies: any = await loadDiscoverTVSeriesData(isGenre.value);
discoverTVSeries.value = movies?.results;

const onLoadFavoriteMovies = async () => {
  const favorite = await useFavoriteMovies();
  favoriteMovies.value = favorite;
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
  const newData: any = await loadDiscoverTVSeriesData(isGenre.value);
  const data: any = await newData.results;
  discoverTVSeries.value = [...discoverTVSeries.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: any) => {
  isGenre.value = id.toString();
  const newData: any = await loadDiscoverTVSeriesData(isGenre.value);
  const data: any = await newData.results;
  discoverTVSeries.value = data;

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const favorite: any = await useFavoriteMovies();
const genreList: any = await useTVGenres();
favoriteMovies.value = favorite;
</script>

<template>
  <CommonMainSection
    title="TV Series"
    :discover="discoverTVSeries"
    :favorite="favoriteMovies.results"
    :genres="genreList.genres"
    :loading="isLoadingFav"
    :placeholder="isLoadingTVSeries"
    :show="isShowLoadMore"
    @click="handleFilterAction"
    @change="handleAddFavorite"
    @load="handleLoadMore"
  />
</template>
