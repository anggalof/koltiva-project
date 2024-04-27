<script setup>
import { IconStar } from "@tabler/icons-vue";
import localImagePath from "~/assets/img/image-not-found.jpeg";
import { formatNumber } from "~/utils/formatter/formatNumber";
import { getYear } from "~/utils/formatter/dateTime";

defineProps({
  title: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  subtype: {
    type: String,
    default: "",
  },
  character: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div>
    <NuxtLink :to="`/movie/${id}`">
      <nuxt-img
        :src="`https://image.tmdb.org/t/p/original${image}`"
        :alt="`movie-${id}`"
        class="max-w-none w-[10rem] h-[15rem]"
        :class="title === 'Cast' ? 'rounded-tl-xl rounded-tr-xl' : 'rounded-xl'"
        :placeholder="localImagePath"
        loading="lazy"
      />
      <div :class="title === 'Cast' && 'bg-white text-black p-2 rounded-br-xl rounded-bl-xl'">
        <div class="pt-2 pb-[0.1rem] text-[12px] text-black font-bold">
          {{ name }}
        </div>
        <div class="text-sm font-medium text-[#929292]">
          {{ title === "Cast" ? character : subtype ? getYear(subtype) : "-" }}
        </div>
        <div
          v-if="title !== 'Cast'"
          class="absolute flex opacity-[1] py-[4px] px-[8px] text-center text-base font-semibold top-0 left-0 text-white"
        >
          <IconStar class="text-yellow-500 w-5 mr-1" />
          {{ formatNumber(rating) }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
