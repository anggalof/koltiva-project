<script lang="ts" setup>
import type { MenuInterface } from "~/types/Routes";

const props = defineProps<{
  name: string;
  menus: MenuInterface[];
}>();

const emit = defineEmits(["close"]);

const route = useRoute();
const router = useRouter();
const searchMovie = ref<string>("");

const handleSearchMovie = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.length >= 3) {
    const searchStore = useSearchStore();
    searchStore.updateKeyword(target.value);
    if (route.path !== "/search") {
      router.push("/search");
    }
  }
};
</script>

<template>
  <div
    class="items-center w-full"
    :class="props.name"
  >
    <div class="p-4 md:p-8 grow">
      <div class="w-full">
        <div class="flex justify-center mx-auto w-full md:w-[40rem] relative">
          <input
            v-model="searchMovie"
            type="text"
            name="search"
            class="block w-full h-12 border-none py-[8px] px-[12px] text-center text-[14px] indent-6 rounded-full text-black bg-[#D9D9D9]"
            placeholder="🔍 Search a movie or a series"
            @input="handleSearchMovie"
          />
        </div>
      </div>
    </div>
    <div class="block md:hidden">
      <div class="block text-[#e5e5e5] relative md:flex">
        <div class="text-sm m-4 md:mx-4">
          <NuxtLink
            v-for="(item, index) in props.menus"
            :key="index"
            :to="item.url"
            class="flex items-center rounded-sm cursor-pointer my-10"
            @click="emit('close')"
          >
            <component :is="item.icon" />
            <span class="ml-2">{{ item.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input::placeholder {
  color: gray;
}
</style>
