<script setup lang="ts">
import IslandsQuickEntry from '../components/IslandsQuickEntry.vue'

const items1 = [
  { id: 1, type: '闲置', caption: '这是一条闲置描述', price: '¥9999', icon: 'trending-down-filled', tagValue: '0.8%' },
]

const items2 = [
  { id: 1, type: '闲置', caption: '这是一条闲置描述', price: '¥9999', icon: 'trending-down-filled', tagValue: '0.8%' },
  { id: 2, type: '闪购', caption: '闪购快速购买', price: '¥299', icon: 'trending-down-filled', tagValue: '5%' },
]

const items3 = [
  { id: 1, type: '闲置', caption: '这是一条闲置描述', price: '¥9999', icon: 'trending-down-filled', tagValue: '0.8%' },
  { id: 2, type: '闪购', caption: '闪购快速购买', price: '¥299', icon: 'trending-down-filled', tagValue: '5%' },
  { id: 3, type: '拍卖', caption: '拍卖抢先预览', price: '¥1999', tag: '剩', tagValue: '5', tagSuffix: '分钟' },
]

const items4to9 = [
  { id: 1, type: '闲置', caption: '这是一条闲置描述', price: '¥9999', icon: 'trending-down-filled', tagValue: '0.8%' },
  { id: 2, type: '闪购', caption: '闪购快速购买', price: '¥299', icon: 'trending-down-filled', tagValue: '5%' },
  { id: 3, type: '拍卖', caption: '拍卖抢先预览', price: '¥1999', tag: '剩', tagValue: '5', tagSuffix: '分钟' },
  { id: 4, type: '福袋', caption: '福袋惊喜不断', price: '¥99', tag: '剩', tagValue: '2/999', tagSuffix: '款' },
  { id: 5, type: '拼团', caption: '拼团更优惠', price: '¥59', tag: '共', tagValue: '999', tagSuffix: '款' },
  { id: 6, type: '拼车', caption: '拼车出行', price: '¥29', tag: '缺', tagValue: '2', tagSuffix: '人' },
  { id: 7, type: '商城', caption: '商品详情', price: '¥199' },
  { id: 8, type: '日历', caption: '日历提醒', tag: '明天', tagValue: '12:00' },
]
</script>

<template>
  <div class="flex flex-col gap-[40px] p-[20px]">
    <div class="text-[14px] font-[500] text-[var(--text-1)]">数量=1</div>
    <IslandsQuickEntry :items="items1" />

    <div class="text-[14px] font-[500] text-[var(--text-1)]">数量=2</div>
    <IslandsQuickEntry :items="items2" />

    <div class="text-[14px] font-[500] text-[var(--text-1)]">数量=3</div>
    <IslandsQuickEntry :items="items3" />

    <div class="text-[14px] font-[500] text-[var(--text-1)]">数量=4~9（网格布局）</div>
    <IslandsQuickEntry :items="items4to9" layout="grid" />
  </div>
</template>