<script setup lang="ts">
// SearchBar - 搜索栏
defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="bg-[rgba(255,255,255,0.12)] rounded-[8px] flex items-center gap-[8px] px-[12px] py-[8px] cursor-pointer"
    @click="emit('click')"
  >
    <slot name="left" />
    <span class="text-[rgba(255,255,255,0.4)] text-[14px] flex-1">{{ placeholder }}</span>
    <slot name="right" />
  </div>
</template>
