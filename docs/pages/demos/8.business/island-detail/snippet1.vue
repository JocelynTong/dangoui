<template>
  <div class="bg-[var(--icon-1,#2b263b)] w-full min-h-screen">
    <!-- 顶部深色区域 -->
    <div class="flex flex-col">
      <!-- StatusBar -->
      <div class="h-44px flex items-center justify-center">
        <span class="text-[var(--bg-1,#ffffff)] text-14px font-500">{{ currentTime }}</span>
      </div>

      <!-- NavigationBar -->
      <div class="flex gap-4px items-center px-12px h-44px">
        <DuIcon name="islands" :size="24" color="#fff" />
        <div class="flex-1 flex items-center gap-8px bg-[var(--white-3,rgba(255,255,255,0.12))] rounded-20px px-12px py-6px">
          <DuIcon name="search" :size="16" color="rgba(255,255,255,0.6)" />
          <span class="text-[rgba(255,255,255,0.6)] text-14px">{{ searchPlaceholder }}</span>
        </div>
        <DuIconButton name="menu" color="#fff" @click="handleMenuClick" />
      </div>

      <!-- IslandsPin 置顶岛入口 -->
      <div class="flex px-4px py-8px overflow-x-auto">
        <IslandsPinBasic
          v-for="island in pinnedIslands"
          :key="island.id"
          :name="island.name"
          :icon="island.icon"
          :cover="island.cover"
          :badge="island.badge"
          :active="island.active"
          @click="handleIslandClick(island)"
        />
      </div>
    </div>

    <!-- 主内容区（白色） -->
    <div class="bg-[var(--bg-1,#ffffff)] rounded-t-12px flex flex-col gap-8px pb-80px">
      <!-- IslandsGrid 横滑入口 -->
      <div class="flex gap-8px items-center px-12px pt-12px overflow-x-auto">
        <IslandsGridBasic
          v-for="entry in gridEntries"
          :key="entry.id"
          :title="entry.title"
          :icon="entry.icon"
          :cover="entry.cover"
          @click="handleEntryClick(entry)"
        />
      </div>

      <!-- IslandsSlide 横滑卡片 -->
      <div class="flex gap-8px px-12px overflow-x-auto">
        <IslandsSlideBasic
          v-for="item in slideItems"
          :key="item.id"
          :name="item.name"
          :covers="item.covers"
          :tag="item.tag"
          :count="item.count"
          @click="handleSlideClick(item)"
        />
        <SPU
          v-for="spu in spuItems"
          :key="spu.id"
          :name="spu.name"
          :cover="spu.cover"
          :tag="spu.tag"
          :second-info="spu.secondInfo"
          @click="handleSpuClick(spu)"
        />
      </div>

      <!-- IslandsQuickEntry 快捷入口 -->
      <IslandsQuickEntry>
        <IslandsQuickEntryCard
          v-for="card in quickEntries"
          :key="card.id"
          :title="card.title"
          :subtitle="card.subtitle"
          :price="card.price"
          :cover="card.cover"
          :badge="card.badge"
          :countdown="card.countdown"
          :stock="card.stock"
          @click="handleQuickEntryClick(card)"
        />
      </IslandsQuickEntry>

      <!-- IslandsFeed 信息流 -->
      <IslandsFeed v-model:active-tab="activeTab" :tabs="feedTabs">
        <template #left>
          <!-- 广告位 -->
          <IslandsFeedAd :total="5" :current="3" />

          <!-- 左列帖子 -->
          <FeedPost
            v-for="post in leftPosts"
            :key="post.id"
            :cover="post.cover"
            :content="post.content"
            :author="post.author"
            :avatar="post.avatar"
            :likes="post.likes"
            :is-video="post.isVideo"
            :is-debut="post.isDebut"
            :island-name="post.islandName"
            size="small"
            @click="handlePostClick(post)"
          />

          <!-- 互动卡片 -->
          <FeedInteractionCard
            :title="interactionTitle"
            :subtitle="interactionSubtitle"
            :avatars="interactionAvatars"
            badge="得闪购券"
            @click="handleShareClick"
          />
        </template>

        <template #right>
          <!-- 右列帖子 -->
          <FeedPost
            v-for="post in rightPosts"
            :key="post.id"
            :cover="post.cover"
            :content="post.content"
            :author="post.author"
            :avatar="post.avatar"
            :likes="post.likes"
            :is-video="post.isVideo"
            :is-debut="post.isDebut"
            :island-name="post.islandName"
            size="large"
            @click="handlePostClick(post)"
          />
        </template>
      </IslandsFeed>
    </div>

    <!-- TabBar -->
    <IslandsTabBar v-model="activeTabBar" :items="tabBarItems" />

    <!-- FAB 发布按钮 -->
    <ButtonFAB icon="plus" color="primary" position="bottom-right" @click="handlePublish" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuIcon, DuIconButton } from 'dangoui'
import {
  IslandsGridBasic,
  IslandsSlideBasic,
  SPU,
  IslandsQuickEntry,
  IslandsQuickEntryCard,
  IslandsFeed,
  IslandsFeedAd,
  FeedPost,
  FeedInteractionCard,
  IslandsPinBasic,
  IslandsTabBar,
  ButtonFAB,
} from '../../../../business/islands'

// 导航栏数据
const currentTime = ref('11:27')
const searchPlaceholder = ref('Labubu泰坦')

// 置顶岛数据
const pinnedIslands = ref([
  { id: 0, name: '首页', icon: 'home', active: false },
  { id: 1, name: 'Labubu', cover: '', badge: 6, active: true },
  { id: 2, name: '剧本杀', cover: '', badge: 41 },
  { id: 3, name: '潘神', cover: '', badge: '999+' },
  { id: 4, name: '毕奇', cover: '', badge: 6 },
  { id: 5, name: '我加入的岛', icon: 'all' },
])

// 横滑入口数据
const gridEntries = ref([
  { id: 1, icon: 'all', title: '图鉴' },
  { id: 2, icon: 'character', title: '角色' },
  { id: 3, cover: 'https://placeholder.com/24x32', title: '潮玩系列' },
  { id: 4, cover: 'https://placeholder.com/24x32', title: '潮玩' },
])

// 横滑卡片数据
const slideItems = ref([
  { id: 1, name: '最新款式', covers: [], tag: '', count: 36 },
])

const spuItems = ref([
  { id: 2, name: 'Spu Name', cover: '', tag: 'NEW', secondInfo: '100 想要' },
  { id: 3, name: 'Spu Name', cover: '', secondInfo: '50 想要' },
  { id: 4, name: 'Spu Name', cover: '', secondInfo: '30 想要' },
])

// 快捷入口数据
const quickEntries = ref([
  { id: 1, title: '领券', subtitle: 'Mega宇航员航员', price: 59.99, cover: '', badge: '领券' },
  { id: 2, title: '涨价', subtitle: 'Mega宇航员航员', price: 59, cover: '' },
  { id: 3, title: '限时', subtitle: '', price: 59.99, cover: '', countdown: { hours: 22, minutes: 30 } },
  { id: 4, title: '剩余', subtitle: '', price: 59.99, cover: '', stock: { current: 22, total: 99 } },
  { id: 5, title: '共999款', subtitle: '', price: 59.99, cover: '' },
])

// Feed Tabs
const feedTabs = ref([
  { name: 'recommend', label: '推荐' },
  { name: 'latest', label: '最新' },
  { name: 'hot', label: '热门' },
])
const activeTab = ref('recommend')

// 左侧帖子数据
const leftPosts = ref([
  { id: 1, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 784, isVideo: true },
  { id: 2, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 784, isDebut: true },
  { id: 3, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 8493, isDebut: true },
])

// 右侧帖子数据
const rightPosts = ref([
  { id: 4, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 784, isDebut: true },
  { id: 5, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 784, isDebut: true },
  { id: 6, content: '留作纪念！', author: 'JocelynTong✨', avatar: '', cover: '', likes: 784 },
])

// 互动卡片数据
const interactionTitle = ref('晒晒你刚入手的潮玩吧')
const interactionSubtitle = ref('3934位Labubu同好期待你的晒图和锐评')
const interactionAvatars = ref(['', '', '', '', ''])

// TabBar 数据
const tabBarItems = ref([
  { name: 'home', label: '岛', icon: 'home' },
  { name: 'discover', label: '发现', icon: 'discover' },
  { name: 'shop', label: '商城', icon: 'shop' },
  { name: 'message', label: '消息', icon: 'message', badge: 35 },
  { name: 'me', label: '我的', icon: 'me' },
])
const activeTabBar = ref('home')

// 事件处理
const handleEntryClick = (entry: (typeof gridEntries.value)[0]) => {
  console.log('Entry clicked:', entry)
}

const handleSlideClick = (item: (typeof slideItems.value)[0]) => {
  console.log('Slide item clicked:', item)
}

const handleSpuClick = (spu: (typeof spuItems.value)[0]) => {
  console.log('SPU clicked:', spu)
}

const handleQuickEntryClick = (card: (typeof quickEntries.value)[0]) => {
  console.log('Quick entry clicked:', card)
}

const handlePostClick = (post: (typeof leftPosts.value)[0]) => {
  console.log('Post clicked:', post)
}

const handleIslandClick = (island: (typeof pinnedIslands.value)[0]) => {
  pinnedIslands.value.forEach(i => (i.active = i.id === island.id))
  console.log('Island clicked:', island)
}

const handleMenuClick = () => {
  console.log('Menu clicked')
}

const handleShareClick = () => {
  console.log('Share clicked')
}

const handlePublish = () => {
  console.log('Publish clicked')
}
</script>
