<script setup lang="ts">
defineProps<{
  time?: string
  color?: 'white' | 'black'
}>()
</script>

<template>
  <div class="flex items-center justify-between w-full h-47px px-16px">
    <span
      class="text-14px font-600"
      :class="color === 'white' ? 'text-[var(--bg-1,#ffffff)]' : 'text-[var(--text-1,#000000)]'"
    >
      {{ time || '11:27' }}
    </span>
    <div class="flex items-center gap-4px">
      <slot />
    </div>
  </div>
</template>
