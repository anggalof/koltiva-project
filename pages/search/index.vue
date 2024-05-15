<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import {
  useAddFavorite,
  useDiscoverMovies,
  useFavoriteMovies,
  useSearchMovies,
} from "~/composables/useMovies";
import { useSearchStore } from "~/stores/searchStore";
import type { TMovies, TFavorite, TMovie } from "~/types/Movies";

const searchStore = useSearchStore();
const query = ref<string>("");
const searchMovies = ref<TMovies[]>([]);
const favoriteMovies = ref<TMovies[]>([]);
const isLoadingFav = ref<boolean>(false);
const isShowLoadMore = ref<boolean>(false);
const currentPage = ref<number>(1);

const keyword = computed(() => searchStore.keyword);
query.value = keyword.value;

watch(
  () => searchStore.keyword,
  async (newValue: string) => {
    const movies = (await loadSearchMovie(newValue)) as TMovie;
    searchMovies.value = movies?.results;
  },
);

const loadSearchMovie = async (keyword: string) => {
  let data: any;
  if (keyword) {
    data = await useSearchMovies(keyword);
  } else {
    data = await useDiscoverMovies(currentPage.value);
  }
  return data;
};

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

const favorite = (await useFavoriteMovies()) as TFavorite;
favoriteMovies.value = favorite?.results;
const movies = (await loadSearchMovie(query.value)) as TMovie;
searchMovies.value = movies?.results;
</script>

<template>
  <CommonSearchResultSection
    title="Movies"
    :query="keyword"
    :search="searchMovies"
    :favorite="favoriteMovies"
    :loading="isLoadingFav"
    :show="isShowLoadMore"
    @change="handleAddFavorite"
  />
</template>
