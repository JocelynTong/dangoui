<template>
  <div class="grid grid-cols-3 gap-16px">
    <NuxtLink
      v-for="item in items"
      :key="item._path"
      :to="item._path"
      class="guide-card flex flex-col items-center p-16px rounded-[var(--radius-lg)] border border-solid border-[var(--doc-border-light)] no-underline transition-all hover:bg-[var(--doc-bg-secondary)] hover:border-[var(--doc-border)]"
    >
      <DuIcon :name="item.icon || getIconFromTitle(item.title)" :size="32" />
      <span class="mt-12px text-14px font-500 c-[var(--doc-text-primary)]">{{ item.title }}</span>
      <span v-if="item.description" class="mt-4px text-12px c-[var(--doc-text-tertiary)] text-center line-clamp-2">{{ item.description }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { DuIcon } from 'dangoui'

const props = defineProps<{
  category: string
}>()

const { data: items } = await useAsyncData(
  `guide-${props.category}`,
  () => queryContent(props.category)
    .only(['_path', 'title', 'description', 'icon'])
    .where({ _partial: false })
    .find(),
)

// Simple icon name mapping by keyword
function getIconFromTitle(title: string) {
  const t = title.toLowerCase()
  if (t.includes('button')) return 'check'
  if (t.includes('cell')) return 'list'
  if (t.includes('input')) return 'edit'
  if (t.includes('dialog')) return 'chat'
  if (t.includes('toast')) return 'info-circle'
  return 'app'
}
</script>

<style scoped>
.guide-card {
  min-height: 120px;
}
</style>