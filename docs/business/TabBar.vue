<script setup lang="ts">
// TabBar - 底部导航栏组件
// figma-node: 17491:161559
import { DuIcon } from 'dangoui'

export interface TabBarItem {
  id: string
  name: string
  icon: string
  active?: boolean
  badge?: number | string
}

defineProps<{
  items: TabBarItem[]
}>()

const emit = defineEmits<{
  click: [item: TabBarItem]
}>()
</script>

<template>
  <div class="bg-white border-t border-[rgba(0,0,0,0.08)]">
    <div class="flex justify-around items-center h-[56px]">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-col items-center gap-[4px] relative cursor-pointer"
        @click="emit('click', item)"
      >
        <DuIcon
          :name="item.icon"
          :size="24"
          :color="item.active ? '#7c66ff' : 'rgba(0,0,0,0.4)'"
        />
        <span
          class="text-[10px] font-[500] leading-[11px]"
          :class="item.active ? 'text-[#7c66ff]' : 'text-[rgba(0,0,0,0.4)]'"
        >{{ item.name }}</span>
        <div
          v-if="item.badge"
          class="absolute -top-[4px] -right-[8px] bg-[#d94a4e] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[4px]"
        >
          <span class="text-white text-[10px] font-[500]">{{ item.badge }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
