<template>
  <div class="flex flex-col gap-[8px] items-center">
    <div class="flex overflow-x-auto scrollbar-hide gap-[8px] px-[12px] w-full">
      <IslandsQuickEntryBasic
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :subtitle="item.subtitle"
        :price="item.price"
        :info="item.info"
        :sub-info="item.subInfo"
        :spu-image="item.spuImage"
        :tag="item.tag"
        @click="handleClick(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import IslandsQuickEntryBasic from './IslandsQuickEntryBasic.vue'

interface QuickEntryItem {
  title: string
  subtitle?: string
  price?: number
  info?: string
  subInfo?: string
  spuImage?: string
  tag?: string
}

withDefaults(defineProps<{
  items?: QuickEntryItem[]
}>(), {
  items: () => [
    { title: '闲置', subtitle: 'Mega宇航员', price: 59.99, tag: '领券' },
    { title: '闪购', subtitle: 'Mega宇航员', price: 59 },
    { title: '拍卖', info: '剩22时30分', price: 59.99 },
    { title: '福袋', info: '剩22/99款', price: 59.99 },
    { title: '拼团', info: '共999款', price: 59.99 },
    { title: '拼车', info: '缺2人', subInfo: '2.4 12:00' },
    { title: '商城', subtitle: 'Mega宇航员', price: 59.99, tag: '领券' },
    { title: '鉴别', subtitle: 'Mega宇航员', price: 59.99 },
    { title: '同城活动', subtitle: 'Mega宇航员', price: 59.99 },
    { title: '日历', info: '12.30', subInfo: '12:00' }
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
