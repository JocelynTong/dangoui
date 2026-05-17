<template>
  <div class="flex flex-col items-center gap-[4px]">
    <div class="rounded-[8px] relative overflow-hidden" :class="sizeClass">
      <DuImage v-if="hasImage" :src="image" width="100%" height="100%" mode="aspectFill" radius="8px" />
      <div v-else class="bg-[var(--bg-2,#f7f7f9)] w-full h-full rounded-[8px] p-[12px]">
        <span v-if="title" class="text-[var(--text-1,#000000)] text-[14px] font-[500] leading-[22px] line-clamp-2">{{ title }}</span>
        <span v-if="content" class="text-[var(--text-2,rgba(0,0,0,0.64))] text-[12px] font-[400] leading-[18px] line-clamp-4 mt-[4px]">{{ content }}</span>
      </div>
      <DuIcon v-if="iconVideo && hasImage" name="video-play-circle-filled" size="16px" color="white" class="absolute bottom-[8px] right-[8px]" />
      <DuTag v-if="tagDebut" color="primary" bg="solid" class="absolute top-[8px] left-[8px]" size="mini">首发</DuTag>
    </div>
    <div class="w-full px-[4px]">
      <span class="text-[var(--text-1,#000000)] text-[14px] font-[500] leading-[22px] line-clamp-1">{{ text }}</span>
    </div>
    <div class="flex items-center justify-between w-full px-[4px]">
      <div class="flex gap-[4px] items-center flex-1">
        <DuAvatar :src="avatarSrc" size="small" />
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[12px] font-[400] leading-[18px] truncate">{{ userName }}</span>
      </div>
      <div class="flex gap-[4px] items-center">
        <DuIcon name="community-like-normal" size="14px" color="var(--text-2,rgba(0,0,0,0.64))" />
        <span class="text-[var(--text-2,rgba(0,0,0,0.64))] text-[14px] font-[500] leading-[22px]">{{ likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuImage, DuIcon, DuTag, DuAvatar } from 'dangoui'

const props = withDefaults(defineProps<{
  image?: string
  text?: string
  title?: string
  content?: string
  userName?: string
  avatarSrc?: string
  likeCount?: number | string
  iconVideo?: boolean
  tagDebut?: boolean
  size?: 'Small(4:3)' | 'Medium(4:3~3:4)' | 'Large(3:4)'
}>(), {
  image: '',
  text: '留作纪念！',
  userName: 'JocelynTong✨',
  avatarSrc: 'https://via.placeholder.com/24',
  likeCount: 784,
  iconVideo: false,
  tagDebut: false,
  size: 'Small(4:3)'
})

const hasImage = computed(() => !!props.image)

const sizeClass = computed(() => {
  const sizes: Record<string, string> = {
    'Small(4:3)': 'w-full aspect-[4/3]',
    'Medium(4:3~3:4)': 'w-full aspect-square',
    'Large(3:4)': 'w-full aspect-[3/4]'
  }
  return sizes[props.size] || sizes['Small(4:3)']
})
</script>
