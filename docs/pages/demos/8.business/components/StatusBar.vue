<template>
  <div class="relative" :class="[colorClass, color === 'white' ? 'bg-[var(--du-secondary-solid-bg)]' : '']" :style="containerStyle">
    <!-- iPhone5s: 左侧绝对定位, 中间绝对定位, 右侧绝对定位 -->
    <template v-if="type === 'iPhone5s'">
      <!-- Left: Signal + Carrier + WiFi (left: 6px) -->
      <div class="absolute flex items-center" style="left: 6px; gap: 2px;">
        <svg width="34" height="6" viewBox="0 0 34 6">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 2.75C5.5 4.26878 4.26878 5.5 2.75 5.5C1.23122 5.5 0 4.26878 0 2.75C0 1.23122 1.23122 0 2.75 0C4.26878 0 5.5 1.23122 5.5 2.75ZM12.5 2.75C12.5 4.26878 11.2688 5.5 9.75 5.5C8.23122 5.5 7 4.26878 7 2.75C7 1.23122 8.23122 0 9.75 0C11.2688 0 12.5 1.23122 12.5 2.75ZM16.75 5.5C18.2688 5.5 19.5 4.26878 19.5 2.75C19.5 1.23122 18.2688 0 16.75 0C15.2312 0 14 1.23122 14 2.75C14 4.26878 15.2312 5.5 16.75 5.5ZM26.5 2.75C26.5 4.26878 25.2688 5.5 23.75 5.5C22.2312 5.5 21 4.26878 21 2.75C21 1.23122 22.2312 0 23.75 0C25.2688 0 26.5 1.23122 26.5 2.75ZM30.75 5.5C32.2688 5.5 33.5 4.26878 33.5 2.75C33.5 1.23122 32.2688 0 30.75 0C29.2312 0 28 1.23122 28 2.75C28 4.26878 29.2312 5.5 30.75 5.5Z" fill="currentColor"/>
        </svg>
        <span class="text-[12px] font-medium leading-[18px]">{{ carrier }}</span>
        <DuIcon name="wifi" :size="15" />
      </div>
      <!-- Center: Time -->
      <div class="absolute text-[12px] font-semibold" style="left: calc(50% - 0.5px); transform: translateX(-50%);">
        {{ displayTime }}
      </div>
      <!-- Right: Battery + 百分比 (right: 6px) -->
      <div class="absolute flex items-center" style="right: 6px; gap: 3px;">
        <span class="text-[12px] font-semibold">{{ batteryLevel }}%</span>
        <svg width="25" height="10" viewBox="0 0 25 10">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.5C0 0.671573 0.671573 0 1.5 0H21C21.8284 0 22.5 0.671573 22.5 1.5V8C22.5 8.82843 21.8284 9.5 21 9.5H1.5C0.671573 9.5 0 8.82843 0 8V1.5ZM23 6.5V3H23.5C24.0523 3 24.5 3.44772 24.5 4V5.5C24.5 6.05228 24.0523 6.5 23.5 6.5H23ZM1.5 0.5C0.947716 0.5 0.5 0.947715 0.5 1.5V8C0.5 8.55229 0.947715 9 1.5 9H21C21.5523 9 22 8.55229 22 8V1.5C22 0.947715 21.5523 0.5 21 0.5H1.5ZM1 1.5C1 1.22386 1.22386 1 1.5 1H21C21.2761 1 21.5 1.22386 21.5 1.5V8C21.5 8.27614 21.2761 8.5 21 8.5H1.5C1.22386 8.5 1 8.27614 1 8V1.5Z" fill="currentColor"/>
        </svg>
      </div>
    </template>

    <!-- iPhone14pro: 时间左侧, 右侧各图标独立绝对定位 -->
    <template v-else-if="type === 'iPhone14pro'">
      <!-- Left: Time (left: 5.6%, 垂直居中) -->
      <div class="absolute text-[15px] font-semibold tracking-[-0.3px] text-white/88" style="left: 5.6%; top: 50%; transform: translateY(-50%);">
        {{ displayTime }}
      </div>
      <!-- Right icons: 各图标独立定位，垂直居中 -->
      <!-- Signal (right: 17.16%) -->
      <svg class="absolute" style="right: 17.16%; top: 50%; transform: translateY(-50%);" width="17" height="11" viewBox="0 0 17 11">
        <rect x="0" y="8" width="3" height="3" rx="1" fill="currentColor" opacity="0.25"/>
        <rect x="5" y="5" width="3" height="6" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="10" y="2" width="3" height="9" rx="1" fill="currentColor" opacity="0.75"/>
      </svg>
      <!-- WiFi (right: 11.74%) -->
      <DuIcon name="wifi" :size="15" class="absolute" style="right: 11.74%; top: 50%; transform: translateY(-50%);" />
      <!-- Battery (right: 3.91%) -->
      <svg class="absolute" style="right: 3.91%; top: 50%; transform: translateY(-50%);" width="25" height="12" viewBox="0 0 25 12">
        <rect opacity="0.35" x="0.5" y="0.5" width="21" height="10.3333" rx="2.16667" stroke="currentColor"/>
        <path opacity="0.4" d="M23 3.66666V7.66666C23.8047 7.32788 24.328 6.53979 24.328 5.66666C24.328 4.79352 23.8047 4.00543 23 3.66666Z" fill="currentColor"/>
        <path d="M2 3.33333C2 2.59695 2.59695 2 3.33333 2L13.6667 2C14.403 2 15 2.59695 15 3.33333V8C15 8.73638 14.403 9.33333 13.6667 9.33333H3.33333C2.59695 9.33333 2 8.73638 2 8V3.33333Z" fill="currentColor"/>
      </svg>
    </template>
    <!-- iPhoneX: 时间左侧, 右侧各图标独立绝对定位 -->
    <template v-else>
      <!-- Left: Time (left: 5.6%, 垂直居中) -->
      <div class="absolute text-[15px] font-semibold tracking-[-0.3px] text-white/88" style="left: 5.6%; top: 50%; transform: translateY(-50%);">
        {{ displayTime }}
      </div>
      <!-- Signal (right: 64.33px, 垂直居中) -->
      <svg class="absolute" style="right: 64.33px; top: 50%; transform: translateY(-50%);" width="17" height="11" viewBox="0 0 17 11">
        <rect x="0" y="8" width="3" height="3" rx="1" fill="currentColor" opacity="0.25"/>
        <rect x="5" y="5" width="3" height="6" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="10" y="2" width="3" height="9" rx="1" fill="currentColor" opacity="0.75"/>
      </svg>
      <!-- WiFi (right: 44.03px, 垂直居中) -->
      <DuIcon name="wifi" :size="15" class="absolute" style="right: 44.03px; top: 50%; transform: translateY(-50%);" />
      <!-- Battery (right: 14.67px, 垂直居中) -->
      <svg class="absolute" style="right: 14.67px; top: 50%; transform: translateY(-50%);" width="25" height="12" viewBox="0 0 25 12">
        <rect opacity="0.35" x="0.5" y="0.5" width="21" height="10.3333" rx="2.16667" stroke="currentColor"/>
        <path opacity="0.4" d="M23 3.66666V7.66666C23.8047 7.32788 24.328 6.53979 24.328 5.66666C24.328 4.79352 23.8047 4.00543 23 3.66666Z" fill="currentColor"/>
        <path d="M2 3.33333C2 2.59695 2.59695 2 3.33333 2L13.6667 2C14.403 2 15 2.59695 15 3.33333V8C15 8.73638 14.403 9.33333 13.6667 9.33333H3.33333C2.59695 9.33333 2 8.73638 2 8V3.33333Z" fill="currentColor"/>
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon } from 'dangoui'

const props = withDefaults(defineProps<{
  time?: string
  carrier?: string
  batteryLevel?: number
  color?: 'default' | 'white'
  type?: 'iPhone5s' | 'iPhoneX' | 'iPhone14pro'
}>(), {
  time: '9:41',
  carrier: '中国移动',
  batteryLevel: 100,
  color: 'default',
  type: 'iPhone14pro',
})

const colorClass = computed(() => props.color === 'white' ? 'text-white' : 'text-black')

// iPhone5s uses "9:41 AM" format, others use "11:27"
const displayTime = computed(() => {
  if (props.type === 'iPhone5s') {
    const [h, m] = props.time.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h > 12 ? h - 12 : h
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`
  }
  return props.time
})

// Each type has a fixed height per Figma
const containerStyle = computed(() => {
  const heights: Record<string, string> = {
    iPhone5s: '20px',
    iPhoneX: '44px',
    iPhone14pro: '59px',
  }
  return { height: heights[props.type] || '59px' }
})
</script>

<style scoped>
</style>