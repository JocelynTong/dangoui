<script setup lang="ts">
defineProps<{
  layout?: 'Horizontal' | 'Vertical'
}>()
</script>

<template>
  <div class="grid flex flex-col gap-[8px]">
    <div class="grid-item6 flex items-center gap-[16px] rounded-[10px] p-[16px] bg-[var(--bg-2)]">
      <div class="bg-[#d9d9d9] w-[56px] h-[56px] rounded-[8px]" />
      <div class="flex flex-col gap-[2px] flex-1 min-w-0">
        <span class="text-[var(--text-1,#000000)] text-[14px] font-[400] leading-[20px]">商品标题</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[12px] font-[400] leading-[16px]">标签1 标签2</span>
      </div>
      <div class="flex flex-col gap-[2px] items-end">
        <span class="text-[var(--text-1,#000000)] text-[14px] font-[400] leading-[20px]">¥123</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[12px] font-[400] leading-[16px]">x1</span>
      </div>
    </div>
    <div class="grid-item5 flex items-center gap-[16px] rounded-[10px] p-[16px] bg-[var(--bg-2)]">
      <div class="bg-[#d9d9d9] w-[56px] h-[56px] rounded-[8px]" />
      <div class="flex flex-col gap-[2px] flex-1 min-w-0">
        <span class="text-[var(--text-1,#000000)] text-[14px] font-[400] leading-[20px]">商品标题</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[12px] font-[400] leading-[16px]">标签1 标签2</span>
      </div>
      <span class="text-[var(--text-1,#000000)] text-[14px] font-[400] leading-[20px]">¥123</span>
    </div>
    <div class="grid-item4 flex items-center gap-[16px] rounded-[10px] p-[16px] bg-[var(--bg-2)]">
      <div class="bg-[#d9d9d9] w-[56px] h-[56px] rounded-[8px]" />
      <div class="flex flex-col gap-[2px] flex-1 min-w-0">
        <span class="text-[var(--text-1,#000000)] text-[14px] font-[400] leading-[20px]">商品标题</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[12px] font-[400] leading-[16px]">标签1 标签2</span>
      </div>
      <span class="text-[var(--primary,#7C66FF)] text-[14px] font-[500] leading-[20px]">¥123</span>
    </div>
    <div class="grid-item3 flex items-center gap-[12px] rounded-[10px] p-[12px] bg-[var(--bg-2)]">
      <div class="bg-[#d9d9d9] w-[48px] h-[48px] rounded-[8px]" />
      <div class="flex flex-col gap-[2px] flex-1 min-w-0">
        <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[16px]">商品标题</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[12px]">标签1 标签2</span>
      </div>
      <div class="flex flex-col gap-[2px] items-end">
        <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[16px]">¥123</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[12px]">x1</span>
      </div>
    </div>
    <div class="grid-item2 flex items-center gap-[12px] rounded-[10px] p-[12px] bg-[var(--bg-2)]">
      <div class="bg-[#d9d9d9] w-[48px] h-[48px] rounded-[8px]" />
      <div class="flex flex-col gap-[2px] flex-1 min-w-0">
        <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[16px]">商品标题</span>
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[400] leading-[12px]">标签1 标签2</span>
      </div>
      <span class="text-[var(--text-1,#000000)] text-[12px] font-[400] leading-[16px]">¥123</span>
    </div>
  </div>
</template>