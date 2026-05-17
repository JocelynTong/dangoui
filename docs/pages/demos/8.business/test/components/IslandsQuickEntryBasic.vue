<template>
  <div class="bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex justify-between pt-[8px] pb-[4px] pl-[8px] pr-[6px] w-[105px] h-[62px] relative cursor-pointer" @click="handleClick">
    <div class="flex flex-col gap-[6px] justify-center flex-1">
      <span class="text-[var(--icon-1,#2b263b)] text-[13px] font-[1000] leading-[13px]">{{ title }}</span>
      <div class="flex flex-col gap-[2px]">
        <span v-if="subtitle" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[11px] truncate">{{ subtitle }}</span>
        <Price v-if="price" :value="price" />
        <div v-if="info" class="flex flex-col gap-[2px]">
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[11px]">{{ info }}</span>
          <span v-if="subInfo" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[11px]">{{ subInfo }}</span>
        </div>
      </div>
    </div>
    <SPUBasic :spu-png="spuImage" size="33*44" />
    <DuTag v-if="tag" color="danger" bg="solid" size="mini" class="absolute top-[4px] right-[4px]">{{ tag }}</DuTag>
  </div>
</template>

<script setup lang="ts">
import { DuTag } from 'dangoui'
import SPUBasic from './SPUBasic.vue'
import Price from './Price.vue'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  price?: number
  info?: string
  subInfo?: string
  spuImage?: string
  tag?: string
}>(), {
  title: '闲置',
  spuImage: 'https://via.placeholder.com/33x44'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
