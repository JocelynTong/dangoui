<script setup lang="ts">
import { DuTag } from 'dangoui'

defineProps<{
  image?: string
  name?: string
  info?: string
  tag?: string
  checked?: boolean
}>()
</script>

<template>
  <div class="rounded-4px flex flex-col gap-4px items-center w-74px shrink-0">
    <div class="relative w-74px h-99px">
      <img v-if="image" :src="image" class="w-full h-full object-cover rounded-4px" />
      <div v-else class="w-full h-full bg-[var(--bg-3,#ededf0)] rounded-4px" />
      <DuTag v-if="tag" class="absolute top-4px left-4px" size="mini" type="primary">{{ tag }}</DuTag>
      <slot name="overlay" />
    </div>
    <span v-if="name" class="text-[var(--text-1,#000000)] text-12px font-400 leading-18px text-center line-clamp-1 w-full">
      {{ name }}
    </span>
    <span v-if="info" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px font-400 leading-14px text-center">
      {{ info }}
    </span>
    <slot />
  </div>
</template>
