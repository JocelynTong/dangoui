<template>
  <div class="flex overflow-x-auto scrollbar-hide py-[8px]">
    <IslandsPinBasic
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :image="item.image"
      :badge="item.badge"
      :badge-value="item.badgeValue"
      :selected="selectedIndex === index"
      :type="item.type"
      @click="handleSelect(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IslandsPinBasic from './IslandsPinBasic.vue'

interface IslandsPinItem {
  name: string
  image?: string
  badge?: boolean
  badgeValue?: number
  type?: 'Home' | 'Islands' | 'MyIslands'
}

withDefaults(defineProps<{
  items?: IslandsPinItem[]
}>(), {
  items: () => [
    { name: '首页', type: 'Home', badge: false },
    { name: 'Labubu', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 6, type: 'Islands' },
    { name: '剧本杀', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 41, type: 'Islands' },
    { name: '潘神', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 999, type: 'Islands' },
    { name: '毕奇', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 6, type: 'Islands' },
    { name: '我加入的岛', type: 'MyIslands', badge: false }
  ]
})

const selectedIndex = ref(1)

const handleSelect = (index: number) => {
  selectedIndex.value = index
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
