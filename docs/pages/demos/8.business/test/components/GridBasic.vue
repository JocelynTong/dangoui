<script setup lang="ts">
defineProps<{
  summary?: boolean
  layout?: string
  type?: string
}>()
</script>

<template>
  <div class="grid-basic rounded-[10px] flex flex-col gap-[4px] items-center">
    <div class="bg-[#d9d9d9] w-[56px] h-[56px] rounded-[8px]" />
    <div class="flex flex-col gap-[2px] items-center">
      <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[18px] text-center">
        <slot name="tag">标题</slot>
      </span>
      <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[11px] text-center">
        <slot name="summary">内容</slot>
      </span>
    </div>
  </div>
</template>