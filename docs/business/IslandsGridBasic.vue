<script setup lang="ts">
// IslandsGridBasic - 类目网格单项
defineProps<{
  name: string
  iconType?: 'emoji' | 'image' | 'spu'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="bg-[#f7f7f9] rounded-[8px] flex gap-[4px] items-center py-[4px] pl-[4px] pr-[8px] h-[40px] cursor-pointer flex-shrink-0"
    @click="emit('click')"
  >
    <div class="flex items-center justify-center w-[32px] h-[32px]">
      <div v-if="iconType === 'emoji'" class="text-[20px]">📚</div>
      <div v-else-if="iconType === 'image'" class="w-[32px] h-[32px] rounded-[4px] bg-[#ccc]" />
      <div v-else class="w-[24px] h-[32px] rounded-[4px] bg-[#ccc]" />
    </div>
    <span class="text-[#2b263b] text-[15px] font-[1000] leading-[14px] whitespace-nowrap">{{ name }}</span>
    <div class="w-[8px] h-[8px] rounded-full bg-[#918b9f]" />
  </div>
</template>
