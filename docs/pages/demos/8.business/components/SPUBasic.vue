<script setup lang="ts">
defineProps<{
  image?: string
  width?: number | string
  height?: number | string
  border?: boolean
  tag?: string
}>()
</script>

<template>
  <div
    class="rounded-4px overflow-hidden relative shrink-0"
    :class="{ 'border border-[var(--border-2,rgba(0,0,0,0.08))]': border }"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width || '74px',
      height: typeof height === 'number' ? `${height}px` : height || '99px'
    }"
  >
    <img v-if="image" :src="image" class="w-full h-full object-cover" />
    <div v-else class="w-full h-full bg-[var(--bg-3,#ededf0)]" />
    <div v-if="tag" class="absolute top-2px left-2px bg-[var(--primary-5,#7c66ff)] rounded-2px px-2px">
      <span class="text-[var(--bg-1,#ffffff)] text-10px">{{ tag }}</span>
    </div>
    <slot />
  </div>
</template>
