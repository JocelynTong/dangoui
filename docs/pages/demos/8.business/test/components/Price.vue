<template>
  <div class="flex gap-[2px] items-center">
    <div class="flex items-center">
      <span class="text-[var(--error-5,#f96464)] text-[12px] font-[500] leading-[18px]">¥</span>
      <span class="text-[var(--error-5,#f96464)] text-[12px] font-[500] leading-[18px]">{{ integerPart }}</span>
      <span v-if="decimalPart" class="text-[var(--error-5,#f96464)] text-[12px] font-[500] leading-[18px]">.{{ decimalPart }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value?: number | string
}>(), {
  value: 0
})

const integerPart = computed(() => {
  const val = typeof props.value === 'string' ? parseFloat(props.value) : props.value
  return Math.floor(val)
})

const decimalPart = computed(() => {
  const val = typeof props.value === 'string' ? parseFloat(props.value) : props.value
  const decimal = (val % 1).toFixed(2).slice(2)
  return decimal === '00' ? '' : decimal
})
</script>
