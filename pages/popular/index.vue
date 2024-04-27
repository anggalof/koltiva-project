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

const searchStore = useSearchStore();

const isLoadingMovie = ref<boolean>(false);
const popularList: any = ref([]);
const favoriteMovies: any = ref({});
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
  async (newValue: any) => {
    const data: any = await loadPopularData(newValue);
    popularList.value = data?.results;
  },
);

const loadPopularData = async (name: string) => {
  isLoadingMovie.value = true;
  let data: any;
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

const data: any = await loadPopularData(popularType.value);
popularList.value = data?.results;

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
  const newData: any = await loadPopularData(popularType.value);
  const data: any = await newData.results;
  popularList.value = [...popularList.value, ...data];

  if (newData.page === newData.total_pages) {
    isShowLoadMore.value = false;
  } else {
    isShowLoadMore.value = true;
  }
};

const handleFilterAction = async (id: any) => {
  isGenre.value = id.toString();
  const newData: any = await loadPopularData(popularType.value);
  const data: any = await newData.results;
  popularList.value = data;

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
  <CommonMainSection
    :title="popularType"
    :discover="popularList"
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
