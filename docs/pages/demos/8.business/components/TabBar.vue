<script setup lang="ts">
import { DuIcon, DuBadge } from 'dangoui'

defineProps<{
  items?: Array<{
    icon: string
    activeIcon?: string
    label: string
    badge?: number | string
  }>
  active?: number
}>()

const emit = defineEmits<{
  (e: 'update:active', value: number): void
}>()
</script>

<template>
  <div class="bg-[var(--bg-1,#ffffff)] flex justify-center items-center w-full border-t border-[var(--border-1,rgba(0,0,0,0.04))]">
    <div class="flex items-center justify-around w-full max-w-500px py-8px">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center gap-2px relative cursor-pointer"
        @click="emit('update:active', index)"
      >
        <div class="relative">
          <DuIcon
            :name="index === active ? (item.activeIcon || item.icon) : item.icon"
            :size="24"
            :class="index === active ? 'text-[var(--primary-5,#7c66ff)]' : 'text-[var(--icon-2,rgba(0,0,0,0.56))]'"
          />
          <DuBadge v-if="item.badge" :content="item.badge" class="absolute -top-4px -right-8px" />
        </div>
        <span
          class="text-10px"
          :class="index === active ? 'text-[var(--primary-5,#7c66ff)]' : 'text-[var(--text-2,rgba(0,0,0,0.72))]'"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
