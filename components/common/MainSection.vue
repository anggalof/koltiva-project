<script lang="ts" setup>
import type { TMovies, TGenres } from "~/types/Movies";

const props = defineProps<{
  title: string;
  discover: TMovies[];
  placeholder: boolean;
  favorite: TMovies[];
  loading: boolean;
  genres: TGenres[];
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "change", id: number, type: boolean): void;
  (e: "load"): void;
  (e: "click", id: number): void;
}>();

const changeFavorite = (id: number, type: boolean) => {
  emit("change", id, type);
};

const loadMore = () => {
  emit("load");
};

const handleFilterAction = (id: number) => {
  emit("click", id);
};

const showMore = props.title.includes("Popular");

const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>

<template>
  <div class="bg-[#EBEAEA] p-4 md:p-6">
    <div class="flex justify-between items-center text-white">
      <div class="text-lg font-bold text-black">{{ title }}</div>
    </div>
    <div class="mt-4 mb-16">
      <div v-if="!showMore">
        <CommonFilterActionSection
          :genres="props.genres"
          @click="handleFilterAction"
        />
      </div>
      <div v-if="props.placeholder">
        <div class="w-full text-white p-[2px] md:p-0">
          <div class="grid">
            <div
              v-for="index in countLoading"
              :key="index"
            >
              <ElementsPlaceLoader />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="props.discover.length > 0">
          <CommonMovieListSection
            :title="title"
            :data="props.discover"
            :favorite="props.favorite"
            :loading="loading"
            :show="show"
            @change="changeFavorite"
            @load="loadMore"
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
  </div>
</template>

