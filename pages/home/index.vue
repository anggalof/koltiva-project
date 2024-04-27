<script lang="ts" setup>
import { ref } from "vue";
import localImagePath from "~/assets/img/image-not-found.jpg";
import { usePopularMovies, useTVPopularMovies } from "~/composables/useMovies";

const popularMovies: any = ref([]);
const isLoadPopularMovie = ref<boolean>(false);
const tvPopularMovies: any = ref([]);
const isLoadPopularTV = ref<boolean>(false);
const currentPage = ref<number>(1);

const loadPopularData = async () => {
  isLoadPopularMovie.value = true;
  const data = await usePopularMovies(currentPage.value);
  if (data) {
    isLoadPopularMovie.value = false;
  }
  return data;
};

const loadTVPopularData = async () => {
  isLoadPopularTV.value = true;
  const data = await useTVPopularMovies(currentPage.value);
  if (data) {
    isLoadPopularTV.value = false;
  }
  return data;
};

const movies: any = await loadPopularData();
popularMovies.value = movies?.results;
const tvMovies: any = await loadTVPopularData();
tvPopularMovies.value = tvMovies?.results;

const handleImageError = (e: any) => {
  e.target.src = localImagePath;
};
</script>

<template>
  <div class="p-4 md:p-6">
    <common-slider-section
      title="Popular Movies"
      :data="popularMovies"
      :placeholder="isLoadPopularMovie"
      @error="handleImageError"
    />

    <common-slider-section
      title="Popular TV Series"
      :data="tvPopularMovies"
      :placeholder="isLoadPopularTV"
      @error="handleImageError"
    />
  </div>
</template>
