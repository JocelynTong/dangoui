<script setup lang="ts">
defineProps<{
  color?: 'default' | 'white' | 'dark'
}>()
</script>

<template>
  <div class="bg-[var(--bg-1,#ffffff)] flex justify-center items-end w-full h-34px pb-8px">
    <div
      class="w-134px h-5px rounded-full"
      :class="{
        'bg-[var(--icon-1,#2b263b)]': color === 'default' || !color,
        'bg-[var(--bg-1,#ffffff)]': color === 'white',
        'bg-[var(--icon-1,#2b263b)]': color === 'dark'
      }"
    />
  </div>
</template>
