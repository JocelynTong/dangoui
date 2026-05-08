<template>
  <div class="rounded-4px flex flex-col gap-4px items-center w-74px cursor-pointer" @click="handleClick">
    <!-- SPU 图片堆叠效果 -->
    <div class="relative w-74px h-99px">
      <!-- 底层图片 -->
      <div class="absolute left-4px top-8px w-48px h-64px rounded-4px overflow-hidden bg-[var(--bg-2,#f7f7f9)]">
        <img v-if="covers[0]" :src="covers[0]" class="w-full h-full object-cover" />
      </div>
      <!-- 中层图片 -->
      <div class="absolute left-2px top-4px w-63px h-84px rounded-4px overflow-hidden bg-[var(--bg-2,#f7f7f9)]">
        <img v-if="covers[1]" :src="covers[1]" class="w-full h-full object-cover" />
      </div>
      <!-- 顶层图片 -->
      <div class="absolute left-0 top-0 w-74px h-99px rounded-4px overflow-hidden bg-[var(--bg-2,#f7f7f9)]">
        <img v-if="covers[2]" :src="covers[2]" class="w-full h-full object-cover" />
        <!-- 左上角标签 -->
        <DuTag v-if="tag" :label="tag" color="primary" size="mini" class="absolute top-4px left-4px" />
        <!-- 数量标签 -->
        <div v-if="count" class="absolute bottom-4px right-4px bg-[var(--black-6,rgba(0,0,0,0.4))] rounded-4px px-4px py-2px">
          <span class="text-[var(--bg-1,#ffffff)] text-10px">+{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- 名称 -->
    <span class="text-[var(--text-1,#000000)] text-12px font-400 leading-18px text-center">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { DuTag } from 'dangoui'

interface Props {
  name: string
  covers?: string[]
  tag?: string
  count?: number
}

withDefaults(defineProps<Props>(), {
  covers: () => [],
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
