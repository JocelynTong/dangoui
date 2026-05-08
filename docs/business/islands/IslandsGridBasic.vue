<template>
  <div
    class="bg-[var(--bg-2,#f7f7f9)] rounded-8px flex gap-4px items-center py-4px pl-4px pr-8px cursor-pointer"
    @click="handleClick"
  >
    <!-- 左侧图标/图片 -->
    <div class="flex gap-10px justify-end items-center w-28px h-32px">
      <DuIcon v-if="icon" :name="icon" :size="20" />
      <img v-else-if="cover" :src="cover" class="w-24px h-32px rounded-4px object-cover" />
      <div v-else class="w-24px h-32px rounded-4px bg-[var(--bg-3,#e5e5e5)]" />
    </div>

    <!-- 标题 -->
    <span class="text-[var(--icon-1,#2b263b)] text-15px font-1000 leading-14px whitespace-nowrap">
      {{ title }}
    </span>

    <!-- 右侧箭头 -->
    <DuIcon name="arrow-right" :size="8" color="var(--text-3,rgba(0,0,0,0.4))" />
  </div>
</template>

<script setup lang="ts">
import { DuIcon } from 'dangoui'

interface Props {
  title: string
  icon?: string
  cover?: string
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
