<script setup lang="ts">
// NavigationBar - 导航栏
</script>

<template>
  <div class="flex gap-[8px] items-center px-[12px] py-[8px]">
    <slot name="left" />
    <slot name="center" />
    <slot name="right" />
    <slot />
  </div>
</template>
