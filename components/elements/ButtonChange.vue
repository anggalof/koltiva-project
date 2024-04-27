<script lang="ts" setup>
defineProps({
  setclass: {
    type: String,
    required: true,
    default: "",
  },
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
});

const emit = defineEmits(["change"]);
</script>

<template>
  <div>
    <div
      :class="setclass"
      @click="emit('change', id, type)"
    >
      <div
        v-if="loading"
        class="loading"
      ></div>
      <span v-else>{{ name }}</span>
    </div>
  </div>
</template>
