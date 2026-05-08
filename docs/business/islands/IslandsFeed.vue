<template>
  <div class="flex flex-col gap-4px" style="border-radius: 8px 8px 0 0">
    <!-- Tabs -->
    <DuTabs v-model:value="activeTab" size="large">
      <DuTab v-for="tab in tabs" :key="tab.name" :name="tab.name">
        {{ tab.label }}
      </DuTab>
    </DuTabs>

    <!-- 瀑布流内容 -->
    <div class="flex gap-8px px-8px">
      <!-- 左列 -->
      <div class="flex flex-col gap-8px flex-1">
        <slot name="left" />
      </div>

      <!-- 右列 -->
      <div class="flex flex-col gap-8px flex-1">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DuTabs, DuTab } from 'dangoui'

interface Tab {
  name: string
  label: string
}

interface Props {
  tabs?: Tab[]
}

withDefaults(defineProps<Props>(), {
  tabs: () => [
    { name: 'recommend', label: '推荐' },
    { name: 'latest', label: '最新' },
    { name: 'hot', label: '热门' },
  ],
})

const activeTab = defineModel<string>('activeTab', { default: 'recommend' })
</script>
