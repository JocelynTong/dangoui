<script setup lang="ts">
// ButtonIcon - 图标按钮
defineProps<{
  label?: string
  icon?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="bg-[#7c66ff] rounded-[16px] flex items-center gap-[4px] px-[12px] py-[6px] cursor-pointer"
    @click="emit('click')"
  >
    <span class="text-white text-[12px] font-[500]">{{ label }}</span>
  </div>
</template>
