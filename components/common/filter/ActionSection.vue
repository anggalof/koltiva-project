<script lang="ts" setup>
import { ref } from "vue";

type TGenres = {
  id: number;
  name: string;
};

interface Props {
  genres: TGenres[];
}

const props = defineProps<Props>();

const emit = defineEmits(["click"]);

const selectedGenre = ref<number>(0);

const handleFilterAction = (id: number) => {
  selectedGenre.value = id;
  emit("click", id);
};
</script>

<template>
  <div class="w-full flex justify-around overflow-y-scroll mb-6">
    <button
      v-for="(genre, index) in props.genres"
      :key="index"
      class="mr-3"
      @click="handleFilterAction(genre.id)"
    >
      <div
        class="text-center rounded-full text-xs md:text-sm px-0 py-2 cursor-pointer hover:py-1.5 hover:bg-white hover:border-black hover:border-2 hover:text-black w-[8rem] md:w-[10rem]"
        :class="
          selectedGenre === genre.id
            ? 'border-black border-2 text-black bg-white py-1.5'
            : 'bg-black text-white'
        "
      >
        {{ genre.name }}
      </div>
    </button>
  </div>
</template>
