<script setup lang="ts">
// SPU - 商品卡片组件
import { DuTag } from 'dangoui'

defineProps<{
  image?: string
  tag?: string
  tagColor?: string
  name?: string
  wantCount?: string | number
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="rounded-[4px] flex flex-col gap-[4px] items-center w-[74px] flex-shrink-0 cursor-pointer"
    @click="emit('click')"
  >
    <div class="relative">
      <div class="w-[74px] h-[99px] rounded-[4px] bg-[#ccc]" />
      <DuTag
        v-if="tag"
        :color="tagColor || 'danger'"
        size="mini"
        class="absolute right-[2px] top-[2px]"
      >
        {{ tag }}
      </DuTag>
    </div>
    <span class="text-[#2b263b] text-[12px] font-[400] leading-[18px] text-center truncate w-full">{{ name }}</span>
    <span v-if="wantCount" class="text-[rgba(0,0,0,0.4)] text-[10px] leading-[11px]">{{ wantCount }} 想要</span>
  </div>
</template>
