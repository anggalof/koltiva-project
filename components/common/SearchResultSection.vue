<script lang="ts" setup>
import MovieListSection from "~/components/common/MovieListSection.vue";
import type { TMovies } from "~/types/Movies";

const props = defineProps<{
  title: string;
  search: TMovies[];
  favorite: TMovies[];
  loading: boolean;
  show: boolean;
  query: string;
}>();

const emit = defineEmits<{
  (e: "change", id: number, type: boolean): void;
  (e: "error", index: number): void;
  (e: "click", id: any): void;
}>();

const changeFavorite = (id: number, type: boolean) => {
  emit("change", id, type);
};

const onImageError = (e: any) => {
  emit("error", e);
};

const loadMore = () => {};
</script>

<template>
  <div class="bg-[#EBEAEA] p-4 md:p-6 md:mb-24">
    <div class="flex items-center text-white">
      <div class="text-lg font-bold text-black">Showing search results for:</div>
      <div class="block md:flex;">
        <div class="text-center text-lg text-black ml-2 cursor-pointer">
          {{ query }}
        </div>
      </div>
    </div>
    <div class="mt-4 mb-10">
      <div v-if="props.search.length > 0">
        <MovieListSection
          :title="title"
          :data="props.search"
          :favorite="props.favorite"
          :loading="loading"
          :show="show"
          @load="loadMore"
          @change="changeFavorite"
          @error="onImageError"
        />
      </div>
      <div v-else>
        <ElementsNotFound
          title="Not Founded!"
          :description="`${
            title === 'Movies' ? 'Movie List' : 'TV Series List'
          } does not have a genre that you choose! please choose another genres.`"
        />
      </div>
    </div>
  </div>
</template>

