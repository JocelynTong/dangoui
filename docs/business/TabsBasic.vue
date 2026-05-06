<script setup lang="ts">
// TabsBasic - 标签页单项
defineProps<{
  active?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="px-[12px] py-[8px] rounded-[16px] cursor-pointer flex-shrink-0"
    :class="active ? 'bg-[#2b263b] text-white' : 'bg-[#f7f7f9] text-[#2b263b]'"
    @click="emit('click')"
  >
    <span class="text-[14px] font-[500]"><slot /></span>
  </div>
</template>
