<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import {
  useAddFavorite,
  usePopularMovies,
  useTVPopularMovies,
  useFavoriteMovies,
  useGenres,
} from "~/composables/useMovies";
import { useSearchStore } from "~/stores/searchStore";
import type { TMovies, TMovie, TFavorite, TGenre } from "~/types/Movies";

const searchStore = useSearchStore();

const isLoadingMovie = ref<boolean>(false);
const popularList = ref<TMovies[]>([]);
const favoriteMovies = ref<TMovies[]>([]);
const isLoadingFav = ref<boolean>(false);
const currentPage = ref<number>(1);

const isGenre = ref<string>("");
const isShowLoadMore = ref<boolean>(true);

const popularType = computed(() => searchStore.popularType);

const router = useRouter();
if (!popularType.value) {
  router.push("/home");
}

watch(
  () => searchStore.popularType,
  async (newValue: string) => {
    const data = (await loadPopularData(newValue)) as TMovie;
    popularList.value = data?.results;
  },
);

const loadPopularData = async (name: string) => {
  isLoadingMovie.value = true;
  let data;
  if (name === "Popular Movies") {
    data = await usePopularMovies(currentPage.value);
  } else {
    data = await useTVPopularMovies(currentPage.value);
  }
  if (data) {
    isLoadingMovie.value = false;
  }
  return data;
};

const data = (await loadPopularData(popularType.value)) as TMovie;
popularList.value = data?.results;

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
  const newData = (await loadPopularData(popularType.value)) as TMovie;
  const data = await newData.results;
  popularList.value = [...popularList.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: number) => {
  isGenre.value = id.toString();
  const newData = (await loadPopularData(popularType.value)) as TMovie;
  const data = await newData.results;
  popularList.value = data;

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
    :title="popularType"
    :discover="popularList"
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
