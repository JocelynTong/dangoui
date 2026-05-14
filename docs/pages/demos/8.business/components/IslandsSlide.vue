<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex w-full overflow-x-auto" style="scrollbar-width: none;">
    <div class="flex gap-8px">
      <slot />
    </div>
  </div>
</template>
