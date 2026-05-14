<script setup lang="ts">
defineProps<{
  items?: Array<{
    icon?: string
    name: string
    badge?: number | string
    active?: boolean
  }>
}>()
</script>

<template>
  <div class="flex w-full overflow-x-auto" style="scrollbar-width: none;">
    <slot>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col gap-8px items-center w-68px h-85px shrink-0"
      >
        <div
          class="rounded-8px w-48px h-48px flex items-center justify-center relative"
          :class="item.active ? 'border-2px border-[var(--primary-5,#7c66ff)]' : 'bg-[var(--white-3,rgba(255,255,255,0.12))]'"
        >
          <img v-if="item.icon" :src="item.icon" class="w-48px h-48px rounded-7px" />
        </div>
        <span class="text-[var(--bg-1,#ffffff)] text-10px font-500 leading-11px text-center">
          {{ item.name }}
        </span>
      </div>
    </slot>
  </div>
</template>
