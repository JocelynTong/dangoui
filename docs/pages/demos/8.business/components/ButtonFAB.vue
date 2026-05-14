<script setup lang="ts">
import { DuIcon } from 'dangoui'

defineProps<{
  icon?: string
  label?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    class="flex gap-4px justify-center items-center px-16px py-12px rounded-full bg-[var(--primary-5,#7c66ff)] shadow-lg"
    @click="emit('click')"
  >
    <DuIcon :name="icon || 'plus'" :size="24" class="text-[var(--bg-1,#ffffff)]" />
    <span v-if="label" class="text-[var(--bg-1,#ffffff)] text-14px font-500">{{ label }}</span>
    <slot />
  </button>
</template>
