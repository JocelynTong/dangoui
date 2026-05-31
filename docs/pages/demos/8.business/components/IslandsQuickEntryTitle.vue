<script setup lang="ts">
defineProps<{
  type: string
}>()
</script>

<template>
  <div class="flex items-center gap-[4px]">
    <span class="text-[var(--text-1,#000000)] text-[14px] font-[500] leading-[20px]">{{ type }}</span>
  </div>
</template>