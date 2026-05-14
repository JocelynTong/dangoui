<script setup lang="ts">
defineProps<{
  images?: string[]
  label?: string
}>()
</script>

<template>
  <div class="rounded-4px flex flex-col gap-4px items-center w-82px shrink-0">
    <div class="relative w-82px h-99px">
      <slot name="images">
        <div v-if="images && images.length >= 3" class="relative w-full h-full">
          <img :src="images[2]" class="absolute left-0 bottom-0 w-48px h-64px rounded-4px object-cover" />
          <img :src="images[1]" class="absolute left-8px bottom-8px w-63px h-84px rounded-4px object-cover" />
          <img :src="images[0]" class="absolute left-16px bottom-0 w-74px h-99px rounded-4px object-cover" />
        </div>
      </slot>
    </div>
    <span class="text-[var(--text-1,#000000)] text-12px font-400 leading-18px text-center">
      {{ label }}
      <slot v-if="!label" />
    </span>
  </div>
</template>
