<template>
  <div class="flex overflow-x-auto scrollbar-hide gap-[8px] px-[12px] py-[8px]">
    <IslandsSlideBasic
      v-for="(item, index) in items"
      :key="index"
      :name="item.name"
      :tag-image="item.tagImage"
      :spu-image="item.spuImage"
      :spu-cover="item.spuCover"
      :spu-size="item.spuSize"
      :label="item.label"
      :second-info="item.secondInfo"
      :type="item.type"
      @click="handleClick(index)"
    />
  </div>
</template>

<script setup lang="ts">
import IslandsSlideBasic from './IslandsSlideBasic.vue'

interface IslandsSlideItem {
  name: string
  tagImage?: string
  spuImage?: string
  spuCover?: string
  spuSize?: '24*32' | '33*44' | '48*64' | '63*84' | '74*99'
  label?: string
  secondInfo?: string
  type: 'Tag' | 'SPU' | 'Notice'
}

withDefaults(defineProps<{
  items?: IslandsSlideItem[]
}>(), {
  items: () => [
    { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' },
    { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' },
    { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' }
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
