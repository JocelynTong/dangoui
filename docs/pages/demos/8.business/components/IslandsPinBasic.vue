<script setup lang="ts">
import { DuBadge } from 'dangoui'

defineProps<{
  icon?: string
  name?: string
  badge?: number | string
  active?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-8px items-center w-68px h-85px shrink-0 relative">
    <div
      class="rounded-8px w-48px h-48px flex items-center justify-center"
      :class="active ? 'border-2px border-[var(--primary-5,#7c66ff)] rounded-10px w-54px h-54px' : 'bg-[var(--white-3,rgba(255,255,255,0.12))]'"
    >
      <img v-if="icon" :src="icon" class="w-48px h-48px rounded-7px" />
      <slot v-else />
    </div>
    <DuBadge v-if="badge" :content="badge" class="absolute top-0 right-8px" />
    <span class="text-[var(--bg-1,#ffffff)] text-10px font-500 leading-11px text-center">
      {{ name }}
    </span>
  </div>
</template>
