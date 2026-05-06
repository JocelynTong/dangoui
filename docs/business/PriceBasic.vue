<script setup lang="ts">
// PriceBasic - 价格展示组件
// figma-node: 17485:222826
defineProps<{
  price: string | number
  unit?: string
  size?: 'small' | 'normal' | 'large'
  color?: string
}>()
</script>

<template>
  <div class="flex gap-[2px] items-center">
    <span
      class="font-[500]"
      :class="[
        size === 'small' ? 'text-[10px] leading-[11px]' : size === 'large' ? 'text-[16px] leading-[24px]' : 'text-[12px] leading-[18px]',
        color ? `text-[${color}]` : 'text-black'
      ]"
    >¥</span>
    <span
      class="font-[500]"
      :class="[
        size === 'small' ? 'text-[12px] leading-[18px]' : size === 'large' ? 'text-[20px] leading-[26px]' : 'text-[16px] leading-[24px]',
        color ? `text-[${color}]` : 'text-black'
      ]"
    >{{ price }}</span>
    <span
      v-if="unit"
      class="font-[500]"
      :class="[
        size === 'small' ? 'text-[10px] leading-[11px]' : size === 'large' ? 'text-[16px] leading-[24px]' : 'text-[12px] leading-[18px]',
        color ? `text-[${color}]` : 'text-black'
      ]"
    >{{ unit }}</span>
  </div>
</template>
