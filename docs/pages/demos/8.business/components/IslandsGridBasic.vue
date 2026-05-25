<script setup lang="ts">
defineProps<{
  show?: boolean
  tag?: boolean
  spu?: boolean
  type?: string
}>()
</script>

<template>
  <div class="islands-grid-basic bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex gap-[4px] items-center py-[4px] pl-[4px] pr-[8px]">
    <!-- icon -->
    <div v-if="$slots.icon" class="w-[28px] h-[32px] flex items-center justify-center">
      <slot name="icon" />
    </div>

    <!-- Tag -->
    <div v-if="$slots.tag" class="w-[32px] h-[32px]">
      <slot name="tag" />
    </div>

    <!-- SPU -->
    <div v-if="$slots.spu" class="w-[24px] h-[32px]">
      <slot name="spu" />
    </div>

    <!-- Text -->
    <span v-if="$slots.default" class="text-[var(--icon-1,#2b263b)] text-[15px] font-[1000] leading-[14px] text-left">
      <slot />
    </span>

    <!-- Arrow -->
    <slot v-if="$slots.arrow" name="arrow" />
  </div>
</template>