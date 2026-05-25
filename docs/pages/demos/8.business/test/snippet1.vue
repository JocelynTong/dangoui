<script setup lang="ts">
import Grid from './components/Grid.vue'
import GridBasic from './components/GridBasic.vue'

const list1 = [
  { tag: '标签1', summary: '内容1' },
  { tag: '标签2', summary: '内容2' },
  { tag: '标签3', summary: '内容3' },
]
const list2 = [
  { tag: '推荐', summary: '内容' },
  { tag: '热门', summary: '内容' },
]
</script>

<template>
  <div class="flex flex-col gap-[40px] p-[20px]">
    <div class="flex flex-col gap-[12px]">
      <span class="text-[14px] font-[500] text-[var(--text-1)]">Grid - 网格列表</span>
      <Grid />
    </div>
    <div class="flex flex-col gap-[12px]">
      <span class="text-[14px] font-[500] text-[var(--text-1)]">GridBasic - 基础网格</span>
      <div class="flex gap-[8px]">
        <GridBasic v-for="(item, i) in list1" :key="i">
          <template #tag>{{ item.tag }}</template>
          <template #summary>{{ item.summary }}</template>
        </GridBasic>
      </div>
    </div>
    <div class="flex flex-col gap-[12px]">
      <span class="text-[14px] font-[500] text-[var(--text-1)]">GridBasic - 横向布局</span>
      <div class="flex gap-[8px]">
        <GridBasic v-for="(item, i) in list2" :key="i">
          <template #tag>{{ item.tag }}</template>
          <template #summary>{{ item.summary }}</template>
        </GridBasic>
      </div>
    </div>
  </div>
</template>