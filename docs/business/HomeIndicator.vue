<script setup lang="ts">
// HomeIndicator - 底部指示器
defineProps<{
  color?: 'white' | 'black'
}>()
</script>

<template>
  <div class="flex justify-center items-center h-[34px] pb-[8px]">
    <div
      class="w-[134px] h-[5px] rounded-full"
      :class="color === 'white' ? 'bg-white' : 'bg-black'"
    />
  </div>
</template>
