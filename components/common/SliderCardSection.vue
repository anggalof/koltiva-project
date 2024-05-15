<script setup>
import localImagePath from "~/assets/img/image-not-found.jpeg";

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
  character: {
    type: String,
    default: "",
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
      <div
        v-if="title === 'Cast'"
        class="bg-white text-black p-2 rounded-br-xl rounded-bl-xl"
      >
        <div class="text-[12px] text-black font-bold">
          {{ name }}
        </div>
        <div class="text-xs font-medium text-[#929292] character">
          {{ character }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.character {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
