<template>
  <div class="rounded-8px flex flex-col gap-4px items-center overflow-hidden">
    <!-- 广告内容 -->
    <div class="rounded-8px flex flex-col gap-10px p-10px relative w-full" :style="backgroundStyle">
      <!-- 广告图片/内容 -->
      <slot>
        <div class="h-120px bg-[var(--bg-2,#f7f7f9)]" />
      </slot>

      <!-- 轮播指示器 -->
      <div v-if="showIndicator && total > 1" class="flex gap-4px absolute bottom-10px left-1/2 -translate-x-1/2">
        <div
          v-for="i in total"
          :key="i"
          class="h-2px rounded-full border-[0.5px] border-[var(--border-2,rgba(0,0,0,0.08))]"
          :class="[
            i === current ? 'bg-[var(--bg-1,#ffffff)] w-12px' : 'bg-[var(--white-6,rgba(255,255,255,0.4))] w-6px'
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  backgroundImage?: string
  current?: number
  total?: number
  showIndicator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  current: 1,
  total: 1,
  showIndicator: true,
})

const backgroundStyle = computed(() => {
  if (props.backgroundImage) {
    return {
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return {}
})
</script>
