<script setup lang="ts">
// ButtonFAB - 浮动操作按钮
// figma-node: 17235:274288
import { DuIcon } from 'dangoui'

defineProps<{
  icon?: string
  color?: string
  size?: 'small' | 'normal' | 'large'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="rounded-[28px] flex gap-[4px] justify-center items-center shadow-lg cursor-pointer"
    :class="[
      size === 'small' ? 'w-[56px] h-[56px]' : size === 'large' ? 'w-[120px] h-[56px]' : 'w-[90px] h-[56px]',
      color ? `bg-[${color}]` : 'bg-[#7c66ff]'
    ]"
    @click="emit('click')"
  >
    <DuIcon :name="icon || 'plus'" :size="24" color="white" />
    <slot />
  </div>
</template>
