<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="mt-20 mb-[20rem]">
      <div class="text-2xl font-bold my-4">{{ title }}</div>
      <div class="text-lg font-normal">{{ description }}</div>
    </div>
  </div>
</template>
