<template>
  <div class="fixed top-0 left-0 right-0 z-20">
    <!-- StatusBar -->
    <div class="h-44px flex items-center justify-center" :class="statusBarClass">
      <span class="text-14px font-500" :class="textColorClass">{{ time }}</span>
    </div>

    <!-- NavBar -->
    <div class="flex gap-4px items-center px-12px h-44px" :class="navBarClass">
      <!-- 左侧 -->
      <slot name="left">
        <DuIcon :name="leftIcon" :size="24" :color="iconColor" @click="handleLeftClick" />
      </slot>

      <!-- 中间搜索栏 -->
      <div
        v-if="showSearch"
        class="flex-1 flex items-center gap-8px rounded-20px px-12px py-6px cursor-pointer"
        :class="searchBarClass"
        @click="handleSearchClick"
      >
        <DuIcon name="search" :size="16" :color="searchIconColor" />
        <span :class="placeholderClass">{{ searchPlaceholder }}</span>
        <div v-if="showCamera" class="w-1px h-16px bg-[var(--white-4,rgba(255,255,255,0.2))]" />
        <DuIcon v-if="showCamera" name="camera" :size="16" :color="searchIconColor" @click.stop="handleCameraClick" />
      </div>

      <!-- 中间标题 -->
      <span v-else class="flex-1 text-center text-16px font-500" :class="textColorClass">{{ title }}</span>

      <!-- 右侧 -->
      <slot name="right">
        <DuIconButton :name="rightIcon" :color="iconColor" @click="handleRightClick" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon, DuIconButton } from 'dangoui'

interface Props {
  time?: string
  title?: string
  leftIcon?: string
  rightIcon?: string
  showSearch?: boolean
  searchPlaceholder?: string
  showCamera?: boolean
  color?: 'white' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  time: '11:27',
  leftIcon: 'islands',
  rightIcon: 'menu',
  showSearch: true,
  searchPlaceholder: '搜索',
  showCamera: true,
  color: 'white',
})

const emit = defineEmits<{
  leftClick: []
  rightClick: []
  searchClick: []
  cameraClick: []
}>()

const isWhite = computed(() => props.color === 'white')

const statusBarClass = computed(() => '')

const navBarClass = computed(() => '')

const textColorClass = computed(() =>
  isWhite.value ? 'text-[var(--bg-1,#ffffff)]' : 'text-[var(--text-1,#000000)]'
)

const iconColor = computed(() =>
  isWhite.value ? '#fff' : 'var(--text-1,#000000)'
)

const searchBarClass = computed(() =>
  isWhite.value ? 'bg-[var(--white-3,rgba(255,255,255,0.12))]' : 'bg-[var(--bg-2,#f7f7f9)]'
)

const searchIconColor = computed(() =>
  isWhite.value ? 'rgba(255,255,255,0.6)' : 'var(--text-3,rgba(0,0,0,0.4))'
)

const placeholderClass = computed(() =>
  isWhite.value ? 'text-[rgba(255,255,255,0.6)] text-14px' : 'text-[var(--text-3,rgba(0,0,0,0.4))] text-14px'
)

const handleLeftClick = () => emit('leftClick')
const handleRightClick = () => emit('rightClick')
const handleSearchClick = () => emit('searchClick')
const handleCameraClick = () => emit('cameraClick')
</script>
