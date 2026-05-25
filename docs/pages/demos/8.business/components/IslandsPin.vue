<script setup lang="ts">
import { ref } from 'vue'
import IslandsPinBasic from './IslandsPinBasic.vue'

const props = withDefaults(defineProps<{
  list?: Array<{
    id: string
    type: 'Home' | 'Islands' | 'MyIslands' | 'Empty'
    name: string
    badge?: boolean
  }>
}>(), {
  list: () => [
    { id: '1', type: 'Home', name: '首页' },
    { id: '2', type: 'Islands', name: 'Labubu', badge: true },
    { id: '3', type: 'Islands', name: '剧本杀', badge: true },
    { id: '4', type: 'Islands', name: '潘神', badge: true },
    { id: '5', type: 'Islands', name: '毕奇', badge: true },
    { id: '6', type: 'MyIslands', name: '我加入的岛' },
  ],
})

const selected = ref(0)
</script>

<template>
  <div class="islands-pin flex w-[375px]" :style="{ overflowX: 'auto' }">
    <IslandsPinBasic
      v-for="(item, index) in props.list"
      :key="item.id"
      :type="item.type"
      :selected="selected === index"
      :badge="item.badge"
      @update:selected="selected = index"
    >
      {{ item.name }}
    </IslandsPinBasic>
  </div>
</template>