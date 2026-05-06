<script setup lang="ts">
// IslandsPin - 岛入口横滑容器
</script>

<template>
  <div class="flex gap-[4px] overflow-x-auto scrollbar-hide">
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
