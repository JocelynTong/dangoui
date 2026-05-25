<script setup lang="ts">
defineProps<{
  /** 描述文字 */
  caption?: string
}>()
</script>

<template>
  <div class="flex flex-col justify-end flex-1">
    <span class="text-[12px] leading-[18px] text-[var(--text-3)]">{{ caption || '一二三四五六七八九十' }}</span>
  </div>
</template>