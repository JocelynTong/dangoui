<script setup lang="ts">
defineProps<{
  type?: string
}>()
</script>

<template>
  <div class="flex gap-1px items-center">
    <span class="text-[var(--icon-1,#2b263b)] text-15px font-1000 leading-12px">
      {{ type }}
      <slot v-if="!type" />
    </span>
  </div>
</template>
