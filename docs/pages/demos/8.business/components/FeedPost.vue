<script setup lang="ts">
import { DuAvatar, DuTag, DuButton, DuIcon } from 'dangoui'

defineProps<{
  image?: string
  title?: string
  content?: string
  author?: string
  avatar?: string
  island?: string
  likes?: number | string
  isVideo?: boolean
  isDebut?: boolean
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <div class="flex flex-col items-center w-full rounded-8px overflow-hidden bg-[var(--bg-1,#ffffff)]">
    <!-- 图片区域 -->
    <div
      class="relative w-full"
      :class="{
        'aspect-[4/3]': size === 'small',
        'aspect-[1/1]': size === 'medium',
        'aspect-[3/4]': size === 'large'
      }"
    >
      <img v-if="image" :src="image" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-[var(--bg-3,#ededf0)]" />

      <!-- 视频图标 -->
      <div v-if="isVideo" class="absolute top-8px right-8px">
        <DuIcon name="video-play" :size="20" class="text-white" />
      </div>

      <!-- 首发标签 -->
      <DuTag v-if="isDebut" class="absolute top-8px left-8px" size="small" type="primary">首发</DuTag>
    </div>

    <!-- 内容区域 -->
    <div class="flex flex-col gap-4px p-8px w-full">
      <p v-if="content" class="text-[var(--text-1,#000000)] text-14px font-400 leading-20px line-clamp-2">
        {{ content }}
      </p>

      <!-- 用户信息 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4px">
          <DuAvatar v-if="avatar" :src="avatar" :size="16" />
          <span class="text-[var(--text-2,rgba(0,0,0,0.72))] text-12px">{{ author }}</span>
          <span v-if="island" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-12px">{{ island }}</span>
        </div>

        <!-- 点赞 -->
        <div class="flex items-center gap-2px">
          <DuIcon name="like" :size="16" class="text-[var(--icon-3,rgba(0,0,0,0.24))]" />
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-12px">{{ likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
