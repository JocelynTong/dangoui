<script setup lang="ts">
// IslandsPinBasic - 岛入口单项
defineProps<{
  name: string
  badge?: number | string
  active?: boolean
  isHome?: boolean
  isAll?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="flex flex-col gap-[8px] items-center w-[68px] flex-shrink-0 cursor-pointer relative"
    @click="emit('click')"
  >
    <!-- 图标 -->
    <div
      class="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center"
      :class="[
        isHome ? 'bg-[rgba(255,255,255,0.12)]' : isAll ? 'bg-[rgba(255,255,255,0.12)]' : 'bg-[#ccc]',
        active ? 'ring-2 ring-[#7c66ff]' : ''
      ]"
    >
      <span v-if="isHome" class="text-[20px]">🏠</span>
      <span v-else-if="isAll" class="text-[20px]">📋</span>
    </div>

    <!-- 名称 -->
    <span class="text-white text-[10px] font-[500] leading-[11px] text-center">{{ name }}</span>

    <!-- 徽标 -->
    <div
      v-if="badge"
      class="absolute -top-[2px] right-[6px] bg-[#d94a4e] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-[4px]"
    >
      <span class="text-white text-[10px] font-[500]">{{ badge > 99 ? '99+' : badge }}</span>
    </div>
  </div>
</template>
