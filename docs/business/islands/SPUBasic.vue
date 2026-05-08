<template>
  <div class="relative" :style="containerStyle">
    <!-- SPU 图片 -->
    <div class="w-full h-full rounded-4px overflow-hidden bg-[var(--bg-2,#f7f7f9)]">
      <img v-if="cover" :src="cover" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-[var(--bg-3,#e5e5e5)]" />
    </div>

    <!-- 左上角标签 -->
    <DuTag
      v-if="leftTopLabel"
      :label="leftTopLabel"
      :color="leftTopLabelColor"
      size="mini"
      class="absolute top-2px left-2px"
    />

    <!-- 中下角标签 -->
    <div
      v-if="centerBottomLabel"
      class="absolute bottom-2px left-1/2 -translate-x-1/2 bg-[var(--black-6,rgba(0,0,0,0.4))] rounded-4px px-4px py-2px"
    >
      <span class="text-[var(--bg-1,#ffffff)] text-10px">{{ centerBottomLabel }}</span>
    </div>

    <!-- 边框 -->
    <div v-if="border" class="absolute inset-0 rounded-4px border border-[var(--border-2,rgba(0,0,0,0.08))]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuTag } from 'dangoui'

interface Props {
  cover?: string
  size?: string
  border?: boolean
  leftTopLabel?: string
  leftTopLabelColor?: string
  centerBottomLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '48*64',
  border: false,
  leftTopLabelColor: 'primary',
})

const containerStyle = computed(() => {
  const [w, h] = props.size.split('*').map(Number)
  return { width: `${w}px`, height: `${h}px` }
})
</script>
