<script setup lang="ts">
import { ref } from 'vue'
import { DuBadge, DuTag, DuButton, DuTabs, DuTab, DuAvatar, DuIcon } from 'dangoui'

import IslandsHeader from '../components/IslandsHeader.vue'
import IslandsPin from '../components/IslandsPin.vue'
import IslandsPinBasic from '../components/IslandsPinBasic.vue'
import IslandsGrid from '../components/IslandsGrid.vue'
import IslandsGridBasic from '../components/IslandsGridBasic.vue'
import IslandsSlide from '../components/IslandsSlide.vue'
import IslandsSlideBasic from '../components/IslandsSlideBasic.vue'
import IslandsQuickEntry from '../components/IslandsQuickEntry.vue'
import IslandsQuickEntryTitle from '../components/IslandsQuickEntryTitle.vue'
import IslandsQuickEntryInfo from '../components/IslandsQuickEntryInfo.vue'
import IslandsFeed from '../components/IslandsFeed.vue'
import IslandsFeedAd from '../components/IslandsFeedAd.vue'
import FeedPost from '../components/FeedPost.vue'
import SPU from '../components/SPU.vue'
import SPUBasic from '../components/SPUBasic.vue'
import Price from '../components/Price.vue'
import AvatarGrouped from '../components/AvatarGrouped.vue'
import ButtonFAB from '../components/ButtonFAB.vue'
import TabBar from '../components/TabBar.vue'
import HomeIndicator from '../components/HomeIndicator.vue'

const activeTab = ref(0)
const activeTabBar = ref(0)

const pinItems = [
  { name: '首页', icon: '' },
  { name: 'Labubu', badge: 6, active: true },
  { name: '剧本杀', badge: 41 },
  { name: '潘神', badge: '999+' },
  { name: '毕奇', badge: 6 },
  { name: '我加入的岛' },
]

const gridItems = [
  { name: '图鉴' },
  { name: '角色' },
  { name: '潮玩系列' },
  { name: '潮玩' },
]

const quickEntryItems = [
  { id: '1', type: '闲置', caption: 'Mega宇航员航员', price: '¥59.99', tag: '领券' },
  { id: '2', type: '闪购', caption: 'Mega宇航员航员', price: '¥59', tag: '降价', tagValue: '0.8%', icon: 'trending-down-filled' },
  { id: '3', type: '拍卖', caption: '剩22时30分', price: '¥59.99', tag: '剩', tagValue: '5', tagSuffix: '分钟' },
  { id: '4', type: '福袋', caption: '剩22/99款', price: '¥59.99', tag: '剩', tagValue: '2/999', tagSuffix: '款' },
  { id: '5', type: '拼团', caption: '共999款', price: '¥59.99', tag: '共', tagValue: '999', tagSuffix: '款' },
  { id: '6', type: '拼车', caption: '明天12:00出发', tag: '缺', tagValue: '2', tagSuffix: '人' },
  { id: '7', type: '商城', caption: 'Mega宇航员', price: '¥59.99' },
  { id: '8', type: '日历', caption: '明天12:00', tag: '明天', tagValue: '12:00' },
]

const feedTabs = ['推荐', '最新', '未选', '未选', '未选', '未选']

const tabBarItems = [
  { icon: 'home', label: '岛' },
  { icon: 'discovery', label: '发现' },
  { icon: 'shop', label: '商城' },
  { icon: 'message', label: '消息', badge: 35 },
  { icon: 'user', label: '我的' },
]
</script>

<template>
  <div class="bg-[var(--icon-1,#2b263b)] w-375px min-h-812px relative">
    <!-- Header -->
    <IslandsHeader title="Labubu泰坦" />

    <!-- Islands Pin -->
    <IslandsPin class="px-8px">
      <IslandsPinBasic
        v-for="(item, index) in pinItems"
        :key="index"
        :name="item.name"
        :badge="item.badge"
        :active="item.active"
      />
    </IslandsPin>

    <!-- Main Content -->
    <div class="bg-[var(--bg-1,#ffffff)] rounded-12px flex flex-col gap-8px mt-8px">
      <!-- Grid -->
      <IslandsGrid>
        <IslandsGridBasic
          v-for="(item, index) in gridItems"
          :key="index"
          :name="item.name"
        />
      </IslandsGrid>

      <!-- Slide - Tags -->
      <IslandsSlide>
        <IslandsGridBasic v-for="i in 7" :key="i" name="Tag Name" />
      </IslandsSlide>

      <!-- Slide - SPUs -->
      <IslandsSlide>
        <IslandsSlideBasic label="最新款式" />
        <SPU v-for="i in 6" :key="i" name="Spu Name" info="{n} 想要" />
      </IslandsSlide>

      <!-- Quick Entry -->
      <IslandsQuickEntry :items="quickEntryItems" />

      <!-- Feed -->
      <IslandsFeed :tabs="feedTabs" v-model:active-tab="activeTab">
        <!-- Left Column -->
        <div class="flex flex-col gap-8px w-174px">
          <IslandsFeedAd :indicators="5" :active-indicator="3" />
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="784"
            size="small"
            is-video
          />
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="784"
            size="large"
            is-video
            is-debut
          />
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="8493"
            size="medium"
            is-video
            is-debut
          />
          <!-- Activity Card -->
          <div class="bg-[#6a5538] rounded-8px p-12px">
            <span class="text-[var(--white-8,rgba(255,255,255,0.88))] text-11px">多栋款</span>
            <p class="text-[var(--bg-1,#ffffff)] text-16px font-500 mt-4px">晒晒你刚入手的潮玩吧</p>
            <AvatarGrouped class="mt-8px" size="mini" :max="5" />
            <p class="text-[var(--bg-1,#ffffff)] text-11px mt-8px">3934位Labubu同好期待你的晒图和锐评</p>
            <div class="flex justify-center mt-8px relative">
              <DuButton type="soft" size="small">标记并分享</DuButton>
              <DuBadge class="absolute -top-4px -right-4px" type="tag">得闪购券</DuBadge>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="flex flex-col gap-8px w-174px">
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="784"
            size="large"
            is-video
            is-debut
          />
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="8493"
            size="medium"
            is-video
            is-debut
          />
          <FeedPost
            content="留作纪念！"
            author="JocelynTong✨"
            likes="784"
            size="small"
            is-video
            is-debut
          />
          <FeedPost
            title="这是标题这是标题这是标题这是标题这是标题"
            content="大家好，我是青门引的楚梵，此次代表青门引来给大家聊聊天。"
            author="JocelynTong✨"
            likes="784"
            size="small"
            is-debut
          />
        </div>
      </IslandsFeed>
    </div>

    <!-- FAB -->
    <ButtonFAB class="fixed bottom-100px right-16px" />

    <!-- TabBar -->
    <TabBar :items="tabBarItems" v-model:active="activeTabBar" class="fixed bottom-34px left-0 right-0" />

    <!-- Home Indicator -->
    <HomeIndicator class="fixed bottom-0 left-0 right-0" />
  </div>
</template>
