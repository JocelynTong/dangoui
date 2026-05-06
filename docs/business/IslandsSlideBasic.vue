<script setup lang="ts">
// IslandsSlideBasic - 横向滑动商品单项（叠放图片样式）
import { DuTag } from 'dangoui'

defineProps<{
  images?: string[]
  tag?: string
  tagColor?: string
  name?: string
  size?: 'small' | 'medium' | 'large'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="rounded-[4px] flex flex-col gap-[4px] items-center w-[82px] flex-shrink-0 cursor-pointer"
    @click="emit('click')"
  >
    <div class="relative w-[74px] h-[99px]">
      <!-- 叠放效果 -->
      <div class="absolute top-0 left-0 w-[48px] h-[64px] rounded-[4px] bg-[#ddd]" />
      <div class="absolute top-[8px] left-[6px] w-[56px] h-[74px] rounded-[4px] bg-[#ccc]" />
      <div class="absolute top-[16px] left-[11px] w-[63px] h-[84px] rounded-[4px] bg-[#bbb]" />
      <DuTag
        v-if="tag"
        :color="tagColor || 'danger'"
        size="mini"
        class="absolute right-0 top-[16px]"
      >
        {{ tag }}
      </DuTag>
    </div>
    <span class="text-black text-[12px] font-[400] leading-[18px] text-center">{{ name }}</span>
  </div>
</template>
