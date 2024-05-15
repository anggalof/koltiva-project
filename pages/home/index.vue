<script lang="ts" setup>
import { ref } from "vue";
import { usePopularMovies, useTVPopularMovies } from "~/composables/useMovies";
import type { TMovie } from "~/types/Movies";

const isLoadPopularMovie = ref<boolean>(false);
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

const movies = (await loadPopularData()) as TMovie;
const tvMovies = (await loadTVPopularData()) as TMovie;
</script>

<template>
  <div class="p-4 md:p-6">
    <common-slider-section
      title="Popular Movies"
      :data="movies?.results"
      :placeholder="isLoadPopularMovie"
    />

    <common-slider-section
      title="Popular TV Series"
      :data="tvMovies?.results"
      :placeholder="isLoadPopularTV"
    />
  </div>
</template>
