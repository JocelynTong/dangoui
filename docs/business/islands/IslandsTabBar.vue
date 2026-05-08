<template>
  <div class="fixed bottom-0 left-0 right-0 bg-[var(--bg-1,#ffffff)] safe-area-bottom z-20">
    <div class="flex justify-around items-center h-56px border-t border-[var(--border-2,rgba(0,0,0,0.08))]">
      <div
        v-for="item in items"
        :key="item.name"
        class="flex flex-col items-center gap-2px cursor-pointer"
        @click="handleClick(item)"
      >
        <DuBadge v-if="item.badge" :value="item.badge">
          <DuIcon
            :name="item.icon"
            :size="24"
            :color="item.name === modelValue ? 'var(--primary-5,#7c66ff)' : 'var(--text-3,rgba(0,0,0,0.4))'"
          />
        </DuBadge>
        <DuIcon
          v-else
          :name="item.icon"
          :size="24"
          :color="item.name === modelValue ? 'var(--primary-5,#7c66ff)' : 'var(--text-3,rgba(0,0,0,0.4))'"
        />
        <span
          class="text-10px"
          :class="item.name === modelValue ? 'text-[var(--primary-5,#7c66ff)]' : 'text-[var(--text-3,rgba(0,0,0,0.4))]'"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DuIcon, DuBadge } from 'dangoui'

interface TabBarItem {
  name: string
  label: string
  icon: string
  badge?: number | string
}

interface Props {
  items: TabBarItem[]
}

defineProps<Props>()

const modelValue = defineModel<string>({ default: '' })

const handleClick = (item: TabBarItem) => {
  modelValue.value = item.name
}
</script>
