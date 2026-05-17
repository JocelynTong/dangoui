<template>
  <div class="flex justify-between items-center px-[16px] py-[14px]" :class="colorClass">
    <span class="text-[15px] font-[600] tracking-[-0.3px] text-center w-[54px]">{{ time }}</span>
    <div class="flex gap-[5px] items-center">
      <DuIcon name="wifi" size="15px" :color="iconColor" />
      <div class="flex gap-[2px] items-center">
        <div class="border rounded-[3px] w-[22px] h-[11px] opacity-35" :style="{ borderColor: iconColor }" />
        <div class="rounded-[1px] w-[1px] h-[4px] opacity-40" :style="{ backgroundColor: iconColor }" />
      </div>
      <DuIcon name="signal" size="17px" :color="iconColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon } from 'dangoui'

const props = withDefaults(defineProps<{
  time?: string
  color?: 'White' | 'Default'
}>(), {
  time: '11:27',
  color: 'White'
})

const colorClass = computed(() => {
  return props.color === 'White'
    ? 'text-[rgba(255,255,255,0.88)]'
    : 'text-[var(--text-1,#000000)]'
})

const iconColor = computed(() => {
  return props.color === 'White' ? 'rgba(255,255,255,0.88)' : '#000000'
})
</script>
