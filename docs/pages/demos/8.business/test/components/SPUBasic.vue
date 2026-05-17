<template>
  <div class="relative" :class="sizeClass">
    <DuImage :src="spuPng" :width="width" :height="height" :radius="radius" mode="aspectFill" />
    <DuImage v-if="spuCover" :src="spuCover" :width="width" :height="height" :radius="radius" mode="aspectFill" class="absolute inset-0" />
    <div v-if="border" class="absolute inset-0 border-[0.5px] border-[rgba(0,0,0,0.04)]" :style="{ borderRadius: radius }" />
    <div v-if="$slots.leftTop" class="absolute top-0 left-0 p-[4px]">
      <slot name="leftTop" />
    </div>
    <div v-if="$slots.centerBottom" class="absolute bottom-0 left-1/2 -translate-x-1/2">
      <slot name="centerBottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuImage } from 'dangoui'

const props = withDefaults(defineProps<{
  spuPng?: string
  spuCover?: string
  border?: boolean
  size?: '24*32' | '33*44' | '48*64' | '63*84' | '74*99'
}>(), {
  spuPng: 'https://via.placeholder.com/74x99',
  border: false,
  size: '74*99'
})

const sizeClass = computed(() => {
  const sizes: Record<string, string> = {
    '24*32': 'w-[24px] h-[32px]',
    '33*44': 'w-[33px] h-[44px]',
    '48*64': 'w-[48px] h-[64px]',
    '63*84': 'w-[63px] h-[84px]',
    '74*99': 'w-[74px] h-[99px]'
  }
  return sizes[props.size] || sizes['74*99']
})

const width = computed(() => props.size.split('*')[0] + 'px')
const height = computed(() => props.size.split('*')[1] + 'px')
const radius = computed(() => {
  return props.size === '24*32' || props.size === '33*44' || props.size === '48*64' ? '4px' : '8px'
})
</script>
