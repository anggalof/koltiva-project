<script setup lang="ts">
import type { MenuInterface } from "~/types/Routes";

const props = defineProps<{
  menus: MenuInterface[];
}>();

const route = useRoute();
const activeMenu = ref<string | undefined>(route?.path);
const showSecondSidebar = (menu: MenuInterface) => {
  activeMenu.value = menu.url;
};
</script>

<template>
  <div class="h-[100vh]">
    <div class="sidebar hidden md:block fixed">
      <ul id="top">
        <li
          v-for="(item, index) in props.menus"
          :key="index"
          @click="showSecondSidebar(item)"
        >
          <NuxtLink
            :to="item.url"
            class="flex justify-center rounded-sm tab"
            :class="activeMenu === item.url && 'active'"
          >
            <component :is="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  color: #919192;
  background-color: #121314;
  transition: max-width 0.5s ease-in-out;

  ul {
    width: 4rem;

    li {
      .tab {
        height: calc(100dvh - 45rem);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #fff;
          cursor: pointer;
          background-image: linear-gradient(90deg, #0e1723, #1e232a);
        }
      }
    }

    .active {
      color: #fff;
      cursor: pointer;
      background-image: linear-gradient(90deg, #0e1723, #1e232a);
    }
  }
}
</style>
