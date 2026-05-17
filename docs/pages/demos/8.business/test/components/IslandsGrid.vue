<template>
  <div class="flex gap-[8px] items-center overflow-x-auto scrollbar-hide py-[4px] px-[12px]">
    <IslandsGridBasic
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :icon="item.icon"
      :tag-image="item.tagImage"
      :spu-image="item.spuImage"
      :type="item.type"
      @click="handleClick(index)"
    />
  </div>
</template>

<script setup lang="ts">
import IslandsGridBasic from './IslandsGridBasic.vue'

interface IslandsGridItem {
  name: string
  icon?: string
  tagImage?: string
  spuImage?: string
  type: 'icon' | 'tag' | 'spu'
}

withDefaults(defineProps<{
  items?: IslandsGridItem[]
}>(), {
  items: () => [
    { name: '图鉴', icon: 'all', type: 'icon' },
    { name: '角色', tagImage: 'https://via.placeholder.com/32', type: 'tag' },
    { name: '潮玩系列', spuImage: 'https://via.placeholder.com/24x32', type: 'spu' },
    { name: '潮玩', spuImage: 'https://via.placeholder.com/24x32', type: 'spu' }
  ]
})

const emit = defineEmits<{
  click: [index: number]
}>()

const handleClick = (index: number) => {
  emit('click', index)
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
