<script lang="ts" setup>
const getYear = () => {
  return new Date().getFullYear();
};
</script>

<template>
  <div class="bg-[#15191e] p-2 flex justify-center items-center">
    <div class="container">
      <div class="block md:flex justify-between text-white opacity-0.5">
        <div class="font-normal text-[13px] flex items-center justify-center">
          Copyright &copy; {{ getYear() }} MoovieTime. All rights reserved.
        </div>
        <div class="flex justify-center">
          <img
            src="~assets/img/moovietime-logo.svg"
            alt="logo"
            class="w-[5rem] h-[5rem]"
          />
        </div>
        <div class="font-normal text-[13px] justify-center flex items-center">
          Made with Nuxt 3 + Vue 3 + Typescript
        </div>
      </div>
    </div>
  </div>
</template>
