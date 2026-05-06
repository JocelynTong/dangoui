<script setup lang="ts">
// IslandsSlide - 横向滑动容器
</script>

<template>
  <div class="flex gap-[8px] overflow-x-auto scrollbar-hide">
    <slot />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
