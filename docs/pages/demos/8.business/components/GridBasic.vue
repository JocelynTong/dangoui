<script setup lang="ts">
defineProps<{
  image?: string
  name?: string
  layout?: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div
    class="rounded-10px flex items-center shrink-0"
    :class="layout === 'vertical' ? 'flex-col w-48px h-70px' : 'flex-row gap-8px'"
  >
    <div class="w-48px h-48px rounded-8px overflow-hidden">
      <img v-if="image" :src="image" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-[var(--bg-3,#ededf0)]" />
    </div>
    <span class="text-[var(--text-1,#000000)] text-12px font-400 leading-18px text-center line-clamp-1">
      {{ name }}
      <slot v-if="!name" />
    </span>
  </div>
</template>
