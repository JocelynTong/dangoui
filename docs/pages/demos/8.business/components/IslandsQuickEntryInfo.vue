<script setup lang="ts">
defineProps<{
  lines?: string[]
}>()
</script>

<template>
  <div class="flex flex-col gap-2px">
    <template v-if="lines">
      <span
        v-for="(line, index) in lines"
        :key="index"
        class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px font-400 leading-11px"
      >
        {{ line }}
      </span>
    </template>
    <slot v-else />
  </div>
</template>
