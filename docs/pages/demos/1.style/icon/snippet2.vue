
<template>
  <PreviewBlock title="所有图标">
    <div class="mb-16px flex items-center gap-12px">
      <DuSearch class="flex-1" placeholder="输入名称搜索图标..." v-model:value="keyword" />
      <div class="flex items-center gap-8px">
        <span class="text-12px text-neutral-500">{{ iconSize }}px</span>
        <input
          type="range"
          min="12"
          max="64"
          :value="iconSize"
          @input="iconSize = Number(($event.target as HTMLInputElement).value)"
          class="w-80px"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-16px" style="grid-template-columns: 1fr 1fr;">
      <!-- 线性 -->
      <div>
        <div class="text-11px text-neutral-400 mb-12px pb-8px border-b border-neutral-100">线性({{ linearIcons.length }})</div>
        <div class="grid grid-cols-4 gap-x-2px gap-y-4px">
          <div
            v-for="iconName in linearIcons"
            :key="iconName"
            class="flex flex-col items-center text-neutral-800"
          >
            <DuIcon :name="iconName" :size="iconSize" />
            <div class="mt-6px text-11px line-clamp-1 text-center text-neutral-400">{{ iconName }}</div>
          </div>
        </div>
      </div>

      <!-- 填充 -->
      <div>
        <div class="text-11px text-neutral-400 mb-12px pb-8px border-b border-neutral-100">填充({{ filledIcons.length }})</div>
        <div class="grid grid-cols-4 gap-x-2px gap-y-4px">
          <div
            v-for="iconName in filledIcons"
            :key="iconName"
            class="flex flex-col items-center text-neutral-800"
          >
            <DuIcon :name="iconName" :size="iconSize" />
            <div class="mt-6px text-11px line-clamp-1 text-center text-neutral-400">{{ iconName }}</div>
          </div>
        </div>
      </div>
    </div>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DuIcon, DuSearch } from 'dangoui'
import iconConfig from 'dangoui/iconfont-config.json'

const keyword = ref('')
const iconSize = ref(16)

// 按 display_order 顺序（echo localStorage 顺序）
const linearIcons = computed(() => {
  const order = iconConfig.display_order?.linear || []
  return order.filter(n => n.includes(keyword.value))
})

const filledIcons = computed(() => {
  const order = iconConfig.display_order?.filled || []
  return order.filter(n => n.includes(keyword.value))
})
</script>
