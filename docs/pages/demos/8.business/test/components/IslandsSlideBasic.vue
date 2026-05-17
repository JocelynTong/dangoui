<template>
  <div class="rounded-[4px] flex flex-col gap-[4px] items-center cursor-pointer" @click="handleClick">
    <div v-if="type === 'Tag'" class="rounded-[10px]">
      <DuImage :src="tagImage" width="48px" height="48px" radius="8px" mode="aspectFill" />
    </div>
    <div v-else-if="type === 'SPU'" class="relative">
      <SPUBasic :spu-png="spuImage" :spu-cover="spuCover" :size="spuSize">
        <template v-if="label" #leftTop>
          <DuTag color="danger" bg="solid" size="mini">{{ label }}</DuTag>
        </template>
      </SPUBasic>
    </div>
    <div v-else-if="type === 'Notice'" class="flex">
      <SPUBasic :spu-png="spuImage" size="74*99">
        <template v-if="label" #leftTop>
          <DuTag color="danger" bg="solid" size="mini">{{ label }}</DuTag>
        </template>
      </SPUBasic>
    </div>
    <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[18px] text-center truncate w-full">{{ name }}</span>
    <span v-if="secondInfo" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[11px]">{{ secondInfo }}</span>
  </div>
</template>

<script setup lang="ts">
import { DuImage, DuTag } from 'dangoui'
import SPUBasic from './SPUBasic.vue'

withDefaults(defineProps<{
  name?: string
  tagImage?: string
  spuImage?: string
  spuCover?: string
  spuSize?: '24*32' | '33*44' | '48*64' | '63*84' | '74*99'
  label?: string
  secondInfo?: string
  type?: 'Tag' | 'SPU' | 'Notice'
}>(), {
  name: 'Tag Name',
  type: 'Tag',
  spuSize: '74*99'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
