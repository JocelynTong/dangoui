<script setup lang="ts">
import { DuIcon } from 'dangoui'
import IslandsGridBasic from './IslandsGridBasic.vue'
import Tag from './Tag.vue'

const props = withDefaults(defineProps<{
  type?: 'ISLANDS' | 'Search'
  list?: Array<{
    id: string
    name: string
    content?: 'icon' | 'tag' | 'spu'
  }>
}>(), {
  list: () => [
    { id: 'atlas', name: '图鉴', content: 'icon' },
    { id: 'character', name: '角色', content: 'tag' },
    { id: 'toy1', name: '潮玩系列', content: 'spu' },
    { id: 'toy2', name: '潮玩', content: 'spu' },
  ],
})
</script>

<template>
  <div class="flex gap-[8px] items-center px-[10px] overflow-x-auto">
    <IslandsGridBasic
      v-for="item in props.list"
      :key="item.id"
      class="bg-[var(--bg-2,#f7f7f9)] rounded-[8px] flex gap-[4px] items-center py-[4px] pl-[4px] pr-[8px] shrink-0"
    >
      <template v-if="item.content === 'icon'" #icon>
        <div class="pl-[4px] pr-[1px]">
          <DuIcon name="all" :size="20" />
        </div>
      </template>
      <template v-if="item.content === 'tag'" #tag>
        <Tag size="Normal" />
      </template>
      <template v-if="item.content === 'spu'" #spu>
        <div class="w-[24px] h-[32px] bg-[var(--bg-5,#e8e8ed)] rounded-[2px] overflow-hidden">
          <img src="https://picsum.photos/63/84" class="w-full h-full object-cover" alt="" />
        </div>
      </template>
      {{ item.name }}
      <template #arrow>
        <DuIcon name="arrow_heavy_right" :size="8" />
      </template>
    </IslandsGridBasic>
  </div>
</template>