<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon } from 'dangoui'
import IslandsQuickEntryTitle from './IslandsQuickEntryTitle.vue'
import IslandsQuickEntryInfo from './IslandsQuickEntryInfo.vue'

const props = withDefaults(defineProps<{
  count?: number
  entries?: Array<{
    id: string
    type: string
    caption?: string
    price?: string
    tag?: string
    tagValue?: string
    tagSuffix?: string
    icon?: string
  }>
}>(), {
  count: 9,
  entries: () => [
    { id: '1', type: '闲置', caption: '描述文案', price: '¥9999', tag: '降价', tagValue: '0.8%', icon: 'trending-down-filled' },
    { id: '2', type: '闪购', caption: '描述文案', price: '¥9999', tag: '降价', tagValue: '0.8%', icon: 'trending-down-filled' },
    { id: '3', type: '拍卖', caption: '描述文案', price: '¥9999', tag: '剩', tagValue: '5', tagSuffix: '分钟' },
    { id: '4', type: '福袋', caption: '描述文案', price: '¥9999', tag: '剩', tagValue: '2/999', tagSuffix: '款' },
    { id: '5', type: '拼团', caption: '描述文案', price: '¥9999', tag: '共', tagValue: '999', tagSuffix: '款' },
    { id: '6', type: '拼车', caption: '描述文案', price: '¥9999', tag: '明天', tagValue: '12:00', tagSuffix: '人' },
    { id: '7', type: '商城', caption: '描述文案', price: '¥9999' },
    { id: '8', type: '日历', caption: '描述文案', price: '¥9999', tag: '明天', tagValue: '12:00' },
    { id: '9', type: '聊天室', caption: '描述文案' },
  ],
})

const visible = computed(() => props.entries.slice(0, props.count))
</script>

<template>
  <div
    :class="{
      'flex gap-[8px] px-[10px] overflow-x-auto': props.count === 1,
      'flex gap-[8px] px-[10px]': props.count === 2 || props.count === 3,
      'flex flex-col gap-[8px] px-[10px]': props.count >= 4,
    }"
  >
    <template v-if="props.count >= 4">
      <div
        v-for="(row, rowIdx) in Math.ceil(visible.length / 3)"
        :key="rowIdx"
        class="flex gap-[8px]"
      >
        <div
          v-for="item in visible.slice(rowIdx * 3, rowIdx * 3 + 3)"
          :key="item.id"
          class="bg-[var(--bg-2)] rounded-[8px] flex flex-col gap-[8px] py-[8px] pl-[8px] flex-1"
        >
          <IslandsQuickEntryTitle :type="item.type" />
          <div class="flex gap-[4px] items-center flex-1">
            <div class="bg-[var(--icon-disabled)] rounded-[2px] w-[27px] h-[36px]" />
            <IslandsQuickEntryInfo :caption="item.caption" />
            <div class="flex flex-col gap-[4px] items-end">
              <span class="text-[var(--error-5)] text-[16px] font-[900] leading-[24px]">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-for="item in visible"
        :key="item.id"
        class="bg-[var(--bg-2)] rounded-[8px] flex flex-col gap-[8px] py-[8px] pl-[8px]"
        :class="props.count === 1 ? 'w-[355px] shrink-0' : 'flex-1'"
      >
        <IslandsQuickEntryTitle :type="item.type" />
        <div class="flex gap-[4px] items-center flex-1">
          <div class="bg-[var(--icon-disabled)] rounded-[2px] w-[27px] h-[36px]" />
          <IslandsQuickEntryInfo :caption="item.caption" />
          <div class="flex flex-col gap-[4px] items-end">
            <span class="text-[var(--error-5)] text-[16px] font-[900] leading-[24px]">{{ item.price }}</span>
            <div class="flex gap-[1px] items-center">
              <template v-if="item.icon === 'trending-down-filled'">
                <DuIcon name="trending-down-filled" class="w-[8px] h-[8px] text-[var(--success-6)]" />
                <span class="text-[var(--success-6)] text-[10px] leading-[11px]">{{ item.tagValue }}</span>
              </template>
              <template v-else-if="item.tag">
                <span class="text-[var(--text-3)] text-[10px] leading-[11px]">{{ item.tag }}</span>
                <span class="text-[var(--text-1)] text-[10px] leading-[11px]">{{ item.tagValue }}</span>
                <span v-if="item.tagSuffix" class="text-[var(--text-3)] text-[10px] leading-[11px]">{{ item.tagSuffix }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>