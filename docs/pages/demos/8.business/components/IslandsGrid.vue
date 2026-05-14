<script setup lang="ts">
defineProps<{
  items?: Array<{
    icon?: string
    image?: string
    name: string
  }>
}>()
</script>

<template>
  <div class="flex gap-8px items-center w-full overflow-x-auto" style="scrollbar-width: none;">
    <slot>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="bg-[var(--bg-2,#f7f7f9)] rounded-8px flex gap-4px items-center py-4px pl-4px pr-8px h-40px shrink-0"
      >
        <div class="flex gap-10px justify-end items-center w-28px h-32px">
          <img v-if="item.image" :src="item.image" class="w-24px h-32px rounded-4px" />
          <span v-else class="w-20px h-20px" />
        </div>
        <span class="text-[var(--icon-1,#2b263b)] text-15px font-1000 leading-14px">{{ item.name }}</span>
        <svg class="w-8px h-8px" viewBox="0 0 8 8" fill="none">
          <path d="M3 1.5L5.5 4L3 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </slot>
  </div>
</template>
