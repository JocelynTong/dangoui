<template>
  <div class="flex items-baseline" :class="sizeClass">
    <!-- 货币符号 -->
    <span class="text-[var(--text-1,#000000)]" :class="symbolClass">¥</span>
    <!-- 整数部分 -->
    <span class="text-[var(--text-1,#000000)]" :class="integerClass">{{ integerPart }}</span>
    <!-- 小数部分 -->
    <span v-if="decimalPart" class="text-[var(--text-1,#000000)]" :class="decimalClass">.{{ decimalPart }}</span>
    <!-- 原价（划线价） -->
    <span v-if="originalPrice" class="text-[var(--text-3,rgba(0,0,0,0.4))] line-through ml-4px" :class="originalClass">
      ¥{{ originalPrice }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  price: number | string
  originalPrice?: number | string
  size?: 'mini' | 'small' | 'normal' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
})

const integerPart = computed(() => {
  const p = typeof props.price === 'string' ? parseFloat(props.price) : props.price
  return Math.floor(p)
})

const decimalPart = computed(() => {
  const p = typeof props.price === 'string' ? parseFloat(props.price) : props.price
  const decimal = (p % 1).toFixed(2).slice(2)
  return decimal === '00' ? '' : decimal
})

const sizeClass = computed(() => {
  const sizes = {
    mini: 'gap-1px',
    small: 'gap-1px',
    normal: 'gap-2px',
    large: 'gap-2px',
  }
  return sizes[props.size]
})

const symbolClass = computed(() => {
  const sizes = {
    mini: 'text-10px font-500',
    small: 'text-12px font-500',
    normal: 'text-14px font-500',
    large: 'text-16px font-600',
  }
  return sizes[props.size]
})

const integerClass = computed(() => {
  const sizes = {
    mini: 'text-12px font-600',
    small: 'text-14px font-600',
    normal: 'text-18px font-600',
    large: 'text-24px font-700',
  }
  return sizes[props.size]
})

const decimalClass = computed(() => {
  const sizes = {
    mini: 'text-10px font-500',
    small: 'text-12px font-500',
    normal: 'text-12px font-500',
    large: 'text-14px font-600',
  }
  return sizes[props.size]
})

const originalClass = computed(() => {
  const sizes = {
    mini: 'text-10px',
    small: 'text-10px',
    normal: 'text-12px',
    large: 'text-14px',
  }
  return sizes[props.size]
})
</script>
