<script setup lang="ts">
// FeedPost - Feed 帖子卡片
import { DuIcon, DuTag } from 'dangoui'

defineProps<{
  content?: string
  username?: string
  avatar?: string
  likeCount?: number
  image?: string
  isVideo?: boolean
  tag?: string
}>()

const emit = defineEmits<{
  click: []
  like: []
}>()
</script>

<template>
  <div
    class="bg-white rounded-[8px] overflow-hidden cursor-pointer"
    @click="emit('click')"
  >
    <!-- 图片/视频区域 -->
    <div class="relative bg-[#eee] h-[120px]">
      <div v-if="isVideo" class="absolute inset-0 flex items-center justify-center">
        <div class="w-[40px] h-[40px] rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <DuIcon name="play" :size="20" color="white" />
        </div>
      </div>
      <DuTag
        v-if="tag"
        color="danger"
        size="mini"
        class="absolute left-[8px] top-[8px]"
      >
        {{ tag }}
      </DuTag>
    </div>

    <!-- 内容区域 -->
    <div class="p-[8px]">
      <div class="text-[#2b263b] text-[14px] leading-[20px] line-clamp-2">{{ content }}</div>

      <!-- 用户信息 -->
      <div class="flex items-center justify-between mt-[8px]">
        <div class="flex items-center gap-[4px]">
          <div class="w-[20px] h-[20px] rounded-full bg-[#ccc]" />
          <span class="text-[rgba(0,0,0,0.4)] text-[10px]">{{ username }}</span>
        </div>
        <div class="flex items-center gap-[2px]" @click.stop="emit('like')">
          <DuIcon name="heart" :size="14" color="rgba(0,0,0,0.4)" />
          <span class="text-[rgba(0,0,0,0.4)] text-[10px]">{{ likeCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
