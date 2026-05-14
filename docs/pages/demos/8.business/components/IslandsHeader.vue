<script setup lang="ts">
import { DuNavigationBar, DuIcon } from 'dangoui'

defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex flex-col w-full">
    <!-- StatusBar 占位 -->
    <div class="h-[47px] w-full" />
    <!-- NavigationBar -->
    <DuNavigationBar color="white" :border="false">
      <template #left>
        <DuIcon name="islands" :size="24" />
      </template>
      <template #center>
        <div class="flex items-center gap-4px bg-[var(--white-3,rgba(255,255,255,0.12))] rounded-8px px-12px py-6px">
          <DuIcon name="search" :size="16" class="text-[var(--white-6,rgba(255,255,255,0.4))]" />
          <span class="text-[var(--white-6,rgba(255,255,255,0.4))] text-14px">{{ title || '搜索' }}</span>
        </div>
      </template>
      <template #right>
        <DuIcon name="menu" :size="24" />
      </template>
    </DuNavigationBar>
  </div>
</template>
