<template>
  <div
    class="flex flex-col gap-8px items-center w-68px shrink-0 cursor-pointer"
    @click="handleClick"
  >
    <!-- 头像/图标容器 -->
    <DuBadge v-if="badge" :value="badge">
      <div
        class="w-48px h-48px rounded-8px overflow-hidden"
        :class="active ? 'ring-2 ring-[var(--primary-5,#7c66ff)]' : ''"
      >
        <img v-if="cover" :src="cover" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-[var(--white-3,rgba(255,255,255,0.12))] flex items-center justify-center">
          <DuIcon :name="icon || 'home'" :size="24" color="#fff" />
        </div>
      </div>
    </DuBadge>
    <div
      v-else
      class="w-48px h-48px rounded-8px overflow-hidden"
      :class="active ? 'ring-2 ring-[var(--primary-5,#7c66ff)]' : ''"
    >
      <img v-if="cover" :src="cover" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-[var(--white-3,rgba(255,255,255,0.12))] flex items-center justify-center">
        <DuIcon :name="icon || 'home'" :size="24" color="#fff" />
      </div>
    </div>

    <!-- 名称 -->
    <span class="text-[var(--bg-1,#ffffff)] text-10px font-500 leading-11px text-center whitespace-nowrap">
      {{ name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { DuIcon, DuBadge } from 'dangoui'

interface Props {
  name: string
  icon?: string
  cover?: string
  badge?: number | string
  active?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
