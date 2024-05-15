<script lang="ts" setup>
import type { MenuInterface } from "~/types/Routes";

const props = defineProps<{
  menus: MenuInterface[];
}>();

const router = useRouter();
const isOpen = ref(false);

const handleToggle = () => {
  isOpen.value = true;
};

const handleCloseModal = () => {
  isOpen.value = false;
};

const handleDirect = () => {
  return router.push("/");
};
</script>

<template>
  <div class="p-4 flex justify-start items-center md:justify-center">
    <div class="flex items-center p-[6px] w-full">
      <div
        class="cursor-pointer flex w-2/12"
        @click="handleDirect"
      >
        <img
          src="~assets/img/logo.svg"
          alt="logo"
          class="w-30 my-0 md:my-4"
        />
      </div>

      <CommonNavigationNavbarSection
        name="hidden md:flex items-center w-full"
        :menus="menus"
        @close="handleCloseModal"
      />

      <div
        class="ml-auto p-2 flex text-[#292e36] md:text-[#e5e5e5] md:hidden"
        @click="handleToggle"
      >
        <svg
          class="icon-toggle"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3zm0 5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H3z"
          />
        </svg>
      </div>
    </div>
    <div
      class="border-r-2 border-solid border-[#c2cfd6] md:border-none"
      :class="isOpen ? 'block' : 'hidden'"
    >
      <div
        :class="isOpen && 'overlay'"
        @click="handleCloseModal"
      ></div>
      <div class="bg-[#292e36] z-[99999] h-[100vh] fixed right-0 top-0 overflow-y-auto">
        <CommonNavigationNavbarSection
          name="block py-[10px] pl-[4px] pr-[6px] ml-auto"
          :menus="props.menus"
          @close="handleCloseModal"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-toggle {
  fill: currentColor;
  width: 2rem;
  height: 2rem;
}
</style>
