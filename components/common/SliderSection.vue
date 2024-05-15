<script lang="ts" setup>
import type { TMovies } from "~/types/Movies";

const props = defineProps<{
  title: string;
  data: TMovies[];
  placeholder: boolean;
}>();

const handleType = () => {
  const searchStore = useSearchStore();
  searchStore.setPopularType(props.title);
};

const showMore = props.title.includes("Popular");

const countLoading = [1, 2, 3, 4, 5, 6];
</script>

<template>
  <div class="bg-[#EBEAEA]">
    <div class="flex justify-between items-center text-white">
      <div class="text-lg font-medium text-black">{{ title }}</div>
      <div
        v-if="showMore"
        class="block md:flex;"
        @click="handleType"
      >
        <NuxtLink :to="`/popular`">
          <div
            class="bg-[#D9D9D9] text-center rounded-full text-sm text-black px-6 py-2 cursor-pointer hover:bg-gray-100"
          >
            Explore More
          </div>
        </NuxtLink>
      </div>
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
    <div
      v-else
      class="mt-4 mb-10 w-full flex justify-around overflow-y-scroll text-white p-[2px] md:p-0"
    >
      <div
        v-for="item in props.data"
        :key="item.id"
        class="relative mr-4 w-[10rem]"
      >
        <common-slider-card-section
          :id="item.id"
          :title="title"
          :name="item.name"
          :image="title === 'Cast' ? item.profile_path : item.poster_path"
          :character="item.character"
        />
      </div>
    </div>
  </div>
</template>

