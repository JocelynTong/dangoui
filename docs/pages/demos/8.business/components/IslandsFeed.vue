<script setup lang="ts">
import { DuTabs, DuTab } from 'dangoui'

defineProps<{
  tabs?: string[]
  activeTab?: number
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', value: number): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4px rounded-t-8px w-full">
    <DuTabs v-if="tabs" :model-value="activeTab" @update:model-value="emit('update:activeTab', $event as number)">
      <DuTab v-for="(tab, index) in tabs" :key="index" :label="tab" />
    </DuTabs>
    <div class="flex gap-8px">
      <slot />
    </div>
  </div>
</template>
