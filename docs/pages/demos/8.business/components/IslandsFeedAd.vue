<script setup lang="ts">
defineProps<{
  image?: string
  indicators?: number
  activeIndicator?: number
}>()
</script>

<template>
  <div class="rounded-8px flex flex-col gap-4px items-center w-full">
    <div class="rounded-8px flex flex-col gap-10px p-10px relative w-full aspect-[174/150]" :style="{ backgroundColor: '#f0f0f0' }">
      <img v-if="image" :src="image" class="absolute inset-0 w-full h-full object-cover rounded-8px" />
      <slot />
      <div v-if="indicators" class="flex gap-4px absolute bottom-10px left-1/2 -translate-x-1/2">
        <div
          v-for="i in indicators"
          :key="i"
          class="h-2px flex-1 rounded-1px border-0.5px border-[var(--border-2,rgba(0,0,0,0.08))]"
          :class="i === activeIndicator ? 'bg-[var(--bg-1,#ffffff)]' : 'bg-[var(--white-6,rgba(255,255,255,0.4))]'"
        />
      </div>
    </div>
  </div>
</template>
