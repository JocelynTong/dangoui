<template>
  <div
    class="bg-[var(--bg-2,#f7f7f9)] rounded-8px flex justify-between pt-8px pb-4px pl-8px pr-6px relative w-105px h-62px shrink-0 cursor-pointer"
    @click="handleClick"
  >
    <!-- 左侧信息 -->
    <div class="flex flex-col gap-6px justify-center flex-1">
      <!-- 标题 -->
      <span class="text-[var(--icon-1,#2b263b)] text-15px font-1000 leading-12px">{{ title }}</span>

      <!-- 副标题/信息 -->
      <div class="flex flex-col gap-2px justify-center">
        <span v-if="subtitle" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px font-400 leading-11px">{{ subtitle }}</span>

        <!-- 倒计时 -->
        <div v-if="countdown" class="rounded-2px flex gap-1px items-center">
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">剩</span>
          <span class="text-[var(--text-1,#000000)] text-10px font-500">{{ countdown.hours }}</span>
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">时</span>
          <span class="text-[var(--text-1,#000000)] text-10px font-500">{{ countdown.minutes }}</span>
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">分</span>
        </div>

        <!-- 库存 -->
        <div v-if="stock" class="rounded-2px flex gap-1px items-center">
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">剩</span>
          <span class="text-[var(--text-1,#000000)] text-10px font-500">{{ stock.current }}/{{ stock.total }}</span>
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">款</span>
        </div>

        <!-- 价格 -->
        <Price v-if="price" :price="price" size="small" />
      </div>
    </div>

    <!-- 右侧 SPU 图片 -->
    <SPUBasic :cover="cover" size="33*44" />

    <!-- 角标 -->
    <DuTag
      v-if="badge"
      :label="badge"
      color="error"
      size="mini"
      class="absolute top-2px right-2px"
    />
  </div>
</template>

<script setup lang="ts">
import { DuTag } from 'dangoui'
import Price from './Price.vue'
import SPUBasic from './SPUBasic.vue'

interface Props {
  title: string
  subtitle?: string
  price?: number
  cover?: string
  badge?: string
  countdown?: { hours: number; minutes: number }
  stock?: { current: number; total: number }
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
