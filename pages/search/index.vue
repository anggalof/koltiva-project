<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import {
  useAddFavorite,
  useDiscoverMovies,
  useFavoriteMovies,
  useSearchMovies,
} from "~/composables/useMovies";
import { useSearchStore } from "~/stores/searchStore";

const searchStore = useSearchStore();
const query: any = ref("");
const searchMovies: any = ref([]);
const favoriteMovies: any = ref({});
const isLoadingFav = ref<boolean>(false);
const isShowLoadMore = ref<boolean>(false);
const currentPage = ref<number>(1);

const keyword = computed(() => searchStore.keyword);
query.value = keyword.value;

watch(
  () => searchStore.keyword,
  async (newValue: any) => {
    const movies: any = await loadSearchMovie(newValue);
    searchMovies.value = movies?.results;
  },
);

const loadSearchMovie = async (keyword: any) => {
  let data: any;
  if (keyword) {
    data = await useSearchMovies(keyword);
  } else {
    data = await useDiscoverMovies(currentPage.value);
  }
  return data;
};

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

const favorite: any = await useFavoriteMovies();
favoriteMovies.value = favorite;
const movies: any = await loadSearchMovie(query.value);
searchMovies.value = movies?.results;
</script>

<template>
  <CommonSearchResultSection
    title="Movies"
    :query="keyword"
    :search="searchMovies"
    :favorite="favoriteMovies.results"
    :loading="isLoadingFav"
    :show="isShowLoadMore"
    @change="handleAddFavorite"
  />
</template>
