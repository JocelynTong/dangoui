<script setup lang="ts">
defineProps<{
  value?: number | string
  decimal?: string
  size?: 'small' | 'normal' | 'large'
  color?: 'error' | 'primary' | 'default'
}>()

const getColorClass = (color?: string) => {
  switch (color) {
    case 'error': return 'text-[var(--error-5,#f96464)]'
    case 'primary': return 'text-[var(--primary-5,#7c66ff)]'
    default: return 'text-[var(--text-1,#000000)]'
  }
}
</script>

<template>
  <div class="flex gap-2px items-center" :class="getColorClass(color)">
    <span class="text-12px font-500 leading-18px">¥</span>
    <span class="text-12px font-500 leading-18px">{{ value }}</span>
    <span v-if="decimal" class="text-12px font-500 leading-18px">{{ decimal }}</span>
    <slot />
  </div>
</template>
