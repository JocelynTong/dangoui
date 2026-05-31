<script setup lang="ts">
import { computed } from 'vue'
import IslandsQuickEntryTitle from './IslandsQuickEntryTitle.vue'
import IslandsQuickEntryInfo from './IslandsQuickEntryInfo.vue'

const props = withDefaults(defineProps<{
  items?: any[]
  /** 布局模式: 'scroll' | 'grid' | 'auto'（自动根据数量判断） */
  layout?: 'scroll' | 'grid' | 'auto'
}>(), {
  layout: 'auto',
})

// 计算实际布局：数量=4~9时使用grid布局（每行3个）
const actualLayout = computed(() => {
  if (props.layout === 'auto' || props.layout === undefined) {
    const count = props.items?.length ?? 0
    if (count >= 4 && count <= 9) return 'grid'
    return 'scroll'
  }
  return props.layout
})
</script>

<template>
  <!-- 数量=4~9：网格布局（每行3个） -->
  <div v-if="actualLayout === 'grid'" class="flex flex-wrap gap-[8px] px-[10px]">
    <div
      v-for="item in items"
      :key="item.id"
      class="bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex py-[8px] pl-[8px] shrink-0 w-[113px] gap-[8px]"
    >
      <!-- 左侧：Image -->
      <div class="bg-[var(--icon-disabled,#d4d0da)] rounded-[2px] w-[27px] h-[36px] shrink-0" />

      <!-- 右侧：标题 + Info -->
      <div class="flex flex-col gap-[4px] flex-1 min-w-0">
        <IslandsQuickEntryTitle :type="item.type" />
        <IslandsQuickEntryInfo :caption="item.caption" />
        <div class="flex items-center gap-[4px]">
          <span v-if="item.price" class="text-[var(--error-5,#f96464)] text-[16px] font-[900] leading-[24px]">{{ item.price }}</span>
          <template v-if="item.icon === 'trending-down-filled'">
            <div class="bg-[var(--success-1,#e2f7e3)] rounded-[2px] flex items-center px-[2px]">
              <span class="text-[var(--success-6,#379e45)] text-[10px] font-[500] leading-[11px]">↓ {{ item.tagValue }}</span>
            </div>
          </template>
          <template v-else-if="item.tag">
            <div class="rounded-[2px] flex gap-[1px] items-center">
              <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[500] leading-[11px]">{{ item.tag }}</span>
              <span class="text-[var(--text-1,#000000)] text-[10px] font-[500] leading-[11px]">{{ item.tagValue }}</span>
              <span v-if="item.tagSuffix" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[500] leading-[11px]">{{ item.tagSuffix }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- 数量=1/2/3 或指定 scroll 布局：横向滚动 -->
  <div v-else class="flex gap-[8px] px-[10px] overflow-x-auto">
    <div
      v-for="item in items"
      :key="item.id"
      class="bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex py-[8px] pl-[8px] shrink-0 w-[355px] gap-[8px]"
    >
      <!-- 左侧：Image -->
      <div class="bg-[var(--icon-disabled,#d4d0da)] rounded-[2px] w-[27px] h-[36px] shrink-0" />

      <!-- 右侧：标题 + Info -->
      <div class="flex flex-col gap-[4px] flex-1 min-w-0">
        <IslandsQuickEntryTitle :type="item.type" />
        <div class="flex gap-[4px] items-center">
          <div class="flex flex-col gap-[4px] flex-1 min-w-0">
            <IslandsQuickEntryInfo :caption="item.caption" />
            <div class="flex gap-[4px] items-center">
              <span v-if="item.price" class="text-[var(--error-5,#f96464)] text-[16px] font-[900] leading-[24px]">{{ item.price }}</span>
              <template v-if="item.icon === 'trending-down-filled'">
                <div class="bg-[var(--success-1,#e2f7e3)] rounded-[2px] flex items-center px-[2px]">
                  <span class="text-[var(--success-6,#379e45)] text-[10px] font-[500] leading-[11px]">↓ {{ item.tagValue }}</span>
                </div>
              </template>
              <template v-else-if="item.tag">
                <div class="rounded-[2px] flex gap-[1px] items-center">
                  <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[500] leading-[11px]">{{ item.tag }}</span>
                  <span class="text-[var(--text-1,#000000)] text-[10px] font-[500] leading-[11px]">{{ item.tagValue }}</span>
                  <span v-if="item.tagSuffix" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-[10px] font-[500] leading-[11px]">{{ item.tagSuffix }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>