<script lang="ts" setup>
import { IconStar } from "@tabler/icons-vue";
import { getYear } from "~/utils/formatter/dateTime";
import { formatNumber } from "~/utils/formatter/formatNumber";
import type { TMovies } from "~/types/Movies";

const props = defineProps<{
  data: TMovies[];
  favorite: TMovies[];
  loading: boolean;
  show: boolean | null | undefined;
  title: string;
}>();

const emit = defineEmits(["change", "load", "error"]);

const hoveredCard: any = ref(null);

const changeFavorite = (id: number, type: boolean) => {
  emit("change", id, type);
};

const onFavorite = (id: any) => {
  return props.favorite.some((item: any) => item.id === id);
};

const onImageError = (e: any) => {
  emit("error", e);
};
</script>

<template>
  <div class="w-full text-white p-[2px] md:p-0">
    <div class="grid">
      <div
        v-for="(item, index) in props.data"
        :key="item.id"
        class="relative"
        @mouseover="hoveredCard = index"
        @mouseleave="hoveredCard = null"
      >
        <nuxt-img
          :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
          :alt="`movie-${item.id}`"
          class="object-cover rounded-xl w-full h-[18rem]"
          loading="lazy"
          @error="(e) => onImageError(e)"
        />

        <div class="pt-2 pb-[0.1rem] text-[12px] text-black font-bold">
          {{ title === "Movies" ? item.title : item.name }}
        </div>
        <div class="text-sm font-medium text-[#929292]">
          {{
            title === "Movies"
              ? getYear(item.release_date)
              : item.first_air_date
              ? getYear(item.first_air_date)
              : "-"
          }}
        </div>
        <div
          class="absolute flex opacity-[1] py-[4px] px-[8px] text-center text-base font-semibold top-0 left-0 text-white"
        >
          <IconStar class="text-yellow-500 w-5 mr-1" />
          {{ formatNumber(item.vote_average) }}
        </div>
        <div
          v-if="hoveredCard === index"
          class="rounded-xl bg-cyan-700 w-full h-[18rem] p-8 absolute top-0 z-[99999] cursor-pointer"
        >
          <div class="flex justify-center">
            <div class="flex font-semibold text-xs md:text-[18px]">
              <img
                src="~assets/img/star.svg"
                alt="star"
                class="mr-2 w-[1rem]"
              />
              {{ formatNumber(item.vote_average) }}
            </div>
          </div>
          <div class="my-6 text-lg font-semibold text-center">Movies</div>
          <NuxtLink :to="`/movie/${item.id}`">
            <div
              class="bg-[#ff0000] text-white text-center rounded-xl py-1 mt-4 font-bold cursor-pointer"
            >
              VIEW
            </div>
          </NuxtLink>
          <div v-if="onFavorite(item.id)">
            <ElementsButtonChange
              :id="item.id"
              :loading="loading"
              :type="false"
              name="ADDED"
              setclass="bg-yellow-500 text-white flex justify-center rounded-xl py-1 px-2 mt-4 font-bold relative"
              @change="changeFavorite"
            />
          </div>
          <div v-else>
            <ElementsButtonChange
              :id="item.id"
              :loading="loading"
              :type="true"
              name="ADD"
              setclass="border-2 border-solid border-[#ffffff] text-white flex justify-center rounded-xl py-1 px-2 mt-4 font-bold relative"
              @change="changeFavorite"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="show"
      class="flex justify-center content-center"
    >
      <div
        class="bg-[#ff0000] text-white text-center rounded-xl py-2 px-6 mt-20 font-bold hover:cursor-pointer hover:bg-[#0e1723]"
        @click="emit('load')"
      >
        Load More
      </div>
    </div>
  </div>
</template>
