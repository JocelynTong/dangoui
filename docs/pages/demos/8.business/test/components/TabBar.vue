<template>
  <div class="bg-[var(--bg-1,#ffffff)] flex flex-col items-center relative border-t border-[var(--border-2,rgba(0,0,0,0.08))]">
    <div class="flex justify-around items-end w-full py-[8px] px-[24px]">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center gap-[2px] cursor-pointer relative"
        @click="handleClick(index)"
      >
        <DuIcon :name="item.icon" size="27px" :color="activeIndex === index ? activeColor : 'var(--text-3,rgba(0,0,0,0.4))'" />
        <span
          class="text-[10px] font-[400] leading-[11px] text-center"
          :class="activeIndex === index ? 'text-[var(--text-1,#000000)]' : 'text-[var(--text-3,rgba(0,0,0,0.4))]'"
        >{{ item.label }}</span>
        <DuBadge v-if="item.badge" :value="item.badge" class="absolute -top-[2px] -right-[8px]">
          <span />
        </DuBadge>
      </div>
    </div>
    <div class="w-[134px] h-[5px] bg-[var(--mask-4,rgba(0,0,0,0.24))] rounded-[100px] mb-[8px]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuIcon, DuBadge } from 'dangoui'

interface TabBarItem {
  icon: string
  label: string
  badge?: number
}

withDefaults(defineProps<{
  items?: TabBarItem[]
  activeColor?: string
}>(), {
  items: () => [
    { icon: 'home-normal', label: '岛' },
    { icon: 'discovery-normal', label: '发现' },
    { icon: 'b2c-qihuo-normal', label: '商城' },
    { icon: 'im-normal', label: '消息', badge: 35 },
    { icon: 'me-normal', label: '我的' }
  ],
  activeColor: 'var(--primary-5,#7c66ff)'
})

const activeIndex = ref(0)

const handleClick = (index: number) => {
  activeIndex.value = index
}
</script>
