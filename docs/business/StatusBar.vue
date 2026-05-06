<script setup lang="ts">
// StatusBar - 状态栏
defineProps<{
  time?: string
  color?: 'white' | 'black'
}>()
</script>

<template>
  <div class="flex justify-between items-center h-[44px] px-[16px]">
    <span
      class="text-[14px] font-[600]"
      :class="color === 'white' ? 'text-white' : 'text-black'"
    >{{ time || '9:41' }}</span>
    <div class="flex items-center gap-[4px]">
      <div
        class="w-[17px] h-[10px] border-[1.5px] rounded-[3px]"
        :class="color === 'white' ? 'border-white' : 'border-black'"
      />
    </div>
  </div>
</template>
