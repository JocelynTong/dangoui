<template>
  <div class="bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex gap-[4px] items-center py-[4px] pl-[4px] pr-[8px] cursor-pointer" @click="handleClick">
    <div class="flex gap-[10px] justify-center items-center w-[28px] h-[32px]">
      <DuIcon v-if="type === 'icon'" :name="icon" size="20px" />
      <DuImage v-else-if="type === 'tag'" :src="tagImage" width="32px" height="32px" radius="4px" mode="aspectFill" />
      <SPUBasic v-else-if="type === 'spu'" :spu-png="spuImage" size="24*32" />
    </div>
    <span class="text-[var(--icon-1,#2b263b)] text-[15px] font-[1000] leading-[14px]">{{ name }}</span>
    <DuIcon name="arrow-heavy-right" size="8px" />
  </div>
</template>

<script setup lang="ts">
import { DuIcon, DuImage } from 'dangoui'
import SPUBasic from './SPUBasic.vue'

withDefaults(defineProps<{
  name?: string
  icon?: string
  tagImage?: string
  spuImage?: string
  type?: 'icon' | 'tag' | 'spu'
}>(), {
  name: '图鉴',
  icon: 'all',
  type: 'icon'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
