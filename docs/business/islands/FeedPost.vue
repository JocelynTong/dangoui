<template>
  <div class="flex flex-col rounded-8px overflow-hidden bg-[var(--bg-1,#ffffff)]" @click="handleClick">
    <!-- 封面图 -->
    <div v-if="cover" class="relative w-full" :class="coverAspectClass">
      <img :src="cover" class="w-full h-full object-cover" />

      <!-- 视频图标 -->
      <div v-if="isVideo" class="absolute inset-0 flex items-center justify-center">
        <div class="w-40px h-40px rounded-full bg-[var(--black-6,rgba(0,0,0,0.4))] flex items-center justify-center">
          <DuIcon name="play" :size="20" color="#fff" />
        </div>
      </div>

      <!-- 首发标签 -->
      <DuTag v-if="isDebut" label="首发" color="primary" size="mini" class="absolute top-8px left-8px" />
    </div>

    <!-- 内容区 -->
    <div class="p-8px">
      <!-- 标题（无图时显示） -->
      <p v-if="title && !cover" class="text-[var(--text-1,#000000)] text-16px font-500 leading-22px line-clamp-2 mb-4px">
        {{ title }}
      </p>

      <!-- 正文 -->
      <p class="text-[var(--text-1,#000000)] text-14px font-400 leading-20px line-clamp-2">
        {{ content }}
      </p>

      <!-- 用户信息和互动 -->
      <div class="flex justify-between items-center mt-8px">
        <!-- 用户信息 -->
        <div class="flex items-center gap-4px">
          <DuAvatar :src="avatar" size="mini" />
          <span class="text-[var(--text-2,rgba(0,0,0,0.6))] text-12px">{{ author }}</span>
          <!-- 岛标签 -->
          <span v-if="islandName" class="text-[var(--primary-5,#7c66ff)] text-10px bg-[var(--primary-1,#f0edff)] rounded-4px px-4px py-1px">
            {{ islandName }}
          </span>
        </div>

        <!-- 互动数据 -->
        <div class="flex items-center gap-4px">
          <DuIcon :name="supportIcon" :size="16" :color="supported ? 'var(--primary-5,#7c66ff)' : 'var(--text-3,rgba(0,0,0,0.4))'" />
          <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-12px">{{ formatNumber(likes) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon, DuAvatar, DuTag } from 'dangoui'

interface Props {
  cover?: string
  title?: string
  content: string
  author: string
  avatar?: string
  likes?: number
  isVideo?: boolean
  isDebut?: boolean
  islandName?: string
  supported?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  likes: 0,
  isVideo: false,
  isDebut: false,
  supported: false,
  size: 'medium',
})

const emit = defineEmits<{
  click: []
}>()

const coverAspectClass = computed(() => {
  const aspects = {
    small: 'aspect-[4/3]',
    medium: 'aspect-[4/3]',
    large: 'aspect-[3/4]',
  }
  return aspects[props.size]
})

const supportIcon = computed(() => {
  return props.supported ? 'like-filled' : 'like'
})

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const handleClick = () => {
  emit('click')
}
</script>
