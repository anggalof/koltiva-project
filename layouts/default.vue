<script setup lang="ts">
import FooterSection from "~/components/common/FooterSection.vue";
import NavigationSection from "~/components/common/NavigationSection.vue";
import SidebarSection from "~/components/common/SidebarSection.vue";
import routes from "~/data/routes";
</script>

<template>
  <main>
    <div class="flex">
      <SidebarSection :menus="routes" />
      <div class="w-full bg-[#EBEAEA] pl-0 md:pl-16">
        <NavigationSection :menus="routes" />
        <div class="relative overflow-y-auto">
          <slot />
        </div>
        <FooterSection />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-flow: column;
}
</style>
