<template>
  <div class="flex flex-col gap-[8px] items-center relative w-[68px] cursor-pointer" @click="handleClick">
    <div class="relative">
      <DuBadge v-if="badge" :value="badgeValue" :max="99">
        <DuImage v-if="type === 'Islands'" :src="image" width="48px" height="48px" radius="8px" mode="aspectFill" />
        <div v-else-if="type === 'Home'" class="bg-[rgba(255,255,255,0.12)] rounded-[8px] w-[48px] h-[48px] flex items-center justify-center">
          <DuIcon name="home" size="28px" color="var(--primary-5,#7c66ff)" />
        </div>
        <div v-else-if="type === 'MyIslands'" class="bg-[rgba(255,255,255,0.12)] rounded-[8px] w-[48px] h-[48px] flex items-center justify-center">
          <DuIcon name="all" size="24px" color="white" />
        </div>
      </DuBadge>
      <template v-else>
        <DuImage v-if="type === 'Islands'" :src="image" width="48px" height="48px" radius="8px" mode="aspectFill" />
        <div v-else-if="type === 'Home'" class="bg-[rgba(255,255,255,0.12)] rounded-[8px] w-[48px] h-[48px] flex items-center justify-center">
          <DuIcon name="home" size="28px" color="var(--primary-5,#7c66ff)" />
        </div>
        <div v-else-if="type === 'MyIslands'" class="bg-[rgba(255,255,255,0.12)] rounded-[8px] w-[48px] h-[48px] flex items-center justify-center">
          <DuIcon name="all" size="24px" color="white" />
        </div>
      </template>
      <div v-if="selected" class="absolute inset-[-3px] border-[2px] border-[var(--primary-5,#7c66ff)] rounded-[10px]" />
    </div>
    <span class="text-white text-[10px] font-[500] leading-[11px] text-center truncate w-full">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { DuImage, DuIcon, DuBadge } from 'dangoui'

const props = withDefaults(defineProps<{
  name?: string
  image?: string
  badge?: boolean
  badgeValue?: number
  selected?: boolean
  type?: 'Home' | 'Islands' | 'MyIslands'
}>(), {
  name: '首页',
  image: 'https://via.placeholder.com/48',
  badge: false,
  badgeValue: 0,
  selected: false,
  type: 'Islands'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
