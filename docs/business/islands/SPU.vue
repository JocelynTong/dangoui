<template>
  <div class="rounded-4px flex flex-col gap-4px items-center w-74px cursor-pointer" @click="handleClick">
    <!-- SPU 图片 -->
    <div class="relative w-74px h-99px rounded-4px overflow-hidden bg-[var(--bg-2,#f7f7f9)]">
      <img v-if="cover" :src="cover" class="w-full h-full object-cover" />

      <!-- 左上角标签 -->
      <DuTag v-if="tag" :label="tag" color="primary" size="mini" class="absolute top-4px left-4px" />

      <!-- 选中状态 -->
      <div v-if="checked" class="absolute inset-0 bg-[var(--primary-5,#7c66ff)] bg-opacity-20 flex items-center justify-center">
        <DuIcon name="check-circle" :size="32" color="var(--primary-5,#7c66ff)" />
      </div>
    </div>

    <!-- SPU 名称 -->
    <span class="text-[var(--text-1,#000000)] text-12px font-400 leading-18px text-center line-clamp-1">{{ name }}</span>

    <!-- 次级信息（想要人数等） -->
    <span v-if="secondInfo" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px font-400 leading-11px">
      {{ secondInfo }}
    </span>

    <!-- 价格/规格信息 -->
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { DuIcon, DuTag } from 'dangoui'

interface Props {
  name: string
  cover?: string
  tag?: string
  checked?: boolean
  secondInfo?: string
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
