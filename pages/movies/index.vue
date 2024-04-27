<script lang="ts" setup>
import { ref } from "vue";
import MainSection from "~/components/common/MainSection.vue";
import {
  useAddFavorite,
  useDiscoverMovies,
  useFavoriteMovies,
  useGenres,
} from "~/composables/useMovies";

const isLoadingMovie = ref<boolean>(false);
const discoverMovies: any = ref([]);
const favoriteMovies: any = ref({});
const isLoadingFav = ref<boolean>(false);
const currentPage = ref<number>(1);

const isGenre = ref<string>("");
const isShowLoadMore = ref<boolean>(true);

const loadDiscoverData = async (genre: string) => {
  isLoadingMovie.value = true;
  const data: any = await useDiscoverMovies(currentPage.value, genre);
  if (data) {
    isLoadingMovie.value = false;
  }
  return data;
};

const movies: any = await loadDiscoverData(isGenre.value);
discoverMovies.value = movies?.results;

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
  const newData: any = await loadDiscoverData(isGenre.value);
  const data: any = await newData.results;
  discoverMovies.value = [...discoverMovies.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: any) => {
  isGenre.value = id.toString();
  const newData: any = await loadDiscoverData(isGenre.value);
  const data: any = await newData.results;
  discoverMovies.value = data;

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const favorite: any = await useFavoriteMovies();
const genreList: any = await useGenres();
favoriteMovies.value = favorite;
</script>

<template>
  <MainSection
    title="Movies"
    :discover="discoverMovies"
    :favorite="favoriteMovies.results"
    :genres="genreList.genres"
    :loading="isLoadingFav"
    :placeholder="isLoadingMovie"
    :show="isShowLoadMore"
    @click="handleFilterAction"
    @change="handleAddFavorite"
    @load="handleLoadMore"
  />
</template>
