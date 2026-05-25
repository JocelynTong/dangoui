<script setup lang="ts">
import { SpuCard } from '../../../../../qiandao-ui/pkg/ui/spu-card'

const props = withDefaults(defineProps<{
  type?: 'Notice' | 'SpuSlideCard'
  list?: Array<{
    id: string
    name: string
    cover: string
    mainTagDisplayName?: string
    description?: string
    minOnlinePrice?: number
    minPrice?: number
    rate?: { rating?: number | string }
    wishCount?: string
  }>
}>(), {
  list: () => [
    { id: '1', name: 'Labubu', cover: 'https://picsum.photos/74/99?random=1', mainTagDisplayName: '盲盒系列', minOnlinePrice: 99 },
    { id: '2', name: '高达', cover: 'https://picsum.photos/74/99?random=2', mainTagDisplayName: '机械系列', minOnlinePrice: 199 },
    { id: '3', name: '手办', cover: 'https://picsum.photos/74/99?random=3', mainTagDisplayName: '精品手办', minOnlinePrice: 299 },
    { id: '4', name: '福袋', cover: 'https://picsum.photos/74/99?random=4', mainTagDisplayName: '随机福袋', minOnlinePrice: 59 },
  ],
})
</script>

<template>
  <div class="flex px-[10px] flex-1 overflow-x-auto gap-[8px]">
    <SpuCard
      v-for="item in props.list"
      :key="item.id"
      :spu="item"
      size="small"
      class="shrink-0"
    />
  </div>
</template>