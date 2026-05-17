<template>
  <div class="bg-[var(--icon-1,#2b263b)] w-full min-h-screen relative">
    <IslandsHeader time="11:27" placeholder="Labubu泰坦" />

    <IslandsPin :items="pinItems" />

    <div class="bg-[var(--bg-1,#ffffff)] rounded-t-[12px] flex flex-col gap-[8px]">
      <IslandsGrid :items="gridItems" />

      <IslandsSlide :items="tagSlideItems" />

      <IslandsSlide :items="spuSlideItems" />

      <IslandsQuickEntry :items="quickEntryItems" />

      <IslandsFeed
        :tabs="feedTabs"
        :show-ad="true"
        :left-posts="leftPosts"
        :right-posts="rightPosts"
      />
    </div>

    <ButtonFAB text="发布" @click="handleFABClick" />

    <TabBar :items="tabBarItems" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IslandsHeader from './components/IslandsHeader.vue'
import IslandsPin from './components/IslandsPin.vue'
import IslandsGrid from './components/IslandsGrid.vue'
import IslandsSlide from './components/IslandsSlide.vue'
import IslandsQuickEntry from './components/IslandsQuickEntry.vue'
import IslandsFeed from './components/IslandsFeed.vue'
import ButtonFAB from './components/ButtonFAB.vue'
import TabBar from './components/TabBar.vue'

const pinItems = ref([
  { name: '首页', type: 'Home' as const, badge: false },
  { name: 'Labubu', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 6, type: 'Islands' as const },
  { name: '剧本杀', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 41, type: 'Islands' as const },
  { name: '潘神', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 999, type: 'Islands' as const },
  { name: '毕奇', image: 'https://via.placeholder.com/48', badge: true, badgeValue: 6, type: 'Islands' as const },
  { name: '我加入的岛', type: 'MyIslands' as const, badge: false }
])

const gridItems = ref([
  { name: '图鉴', icon: 'all', type: 'icon' as const },
  { name: '角色', tagImage: 'https://via.placeholder.com/32', type: 'tag' as const },
  { name: '潮玩系列', spuImage: 'https://via.placeholder.com/24x32', type: 'spu' as const },
  { name: '潮玩', spuImage: 'https://via.placeholder.com/24x32', type: 'spu' as const }
])

const tagSlideItems = ref([
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const },
  { name: 'Tag Name', tagImage: 'https://via.placeholder.com/48', type: 'Tag' as const }
])

const spuSlideItems = ref([
  { name: '最新款式', spuImage: 'https://via.placeholder.com/74x99', label: '+36', type: 'Notice' as const },
  { name: 'Spu Name', spuImage: 'https://via.placeholder.com/74x99', label: 'NEW', secondInfo: '{n} 想要', type: 'SPU' as const },
  { name: 'Spu Name', spuImage: 'https://via.placeholder.com/74x99', secondInfo: '{n} 想要', type: 'SPU' as const },
  { name: 'Spu Name', spuImage: 'https://via.placeholder.com/74x99', secondInfo: '{n} 想要', type: 'SPU' as const },
  { name: 'Spu Name', spuImage: 'https://via.placeholder.com/74x99', secondInfo: '{n} 想要', type: 'SPU' as const },
  { name: 'Spu Name', spuImage: 'https://via.placeholder.com/74x99', secondInfo: '{n} 想要', type: 'SPU' as const }
])

const quickEntryItems = ref([
  { title: '闲置', subtitle: 'Mega宇航员', price: 59.99, tag: '领券' },
  { title: '闪购', subtitle: 'Mega宇航员', price: 59 },
  { title: '拍卖', info: '剩22时30分', price: 59.99 },
  { title: '福袋', info: '剩22/99款', price: 59.99 },
  { title: '拼团', info: '共999款', price: 59.99 },
  { title: '拼车', info: '缺2人', subInfo: '2.4 12:00' },
  { title: '商城', subtitle: 'Mega宇航员', price: 59.99, tag: '领券' },
  { title: '鉴别', subtitle: 'Mega宇航员', price: 59.99 },
  { title: '同城活动', subtitle: 'Mega宇航员', price: 59.99 },
  { title: '日历', info: '12.30', subInfo: '12:00' },
  { title: '拍照xx', info: '黑科技功能', subInfo: '发快速出售' },
  { title: '宝可梦战队', info: '黑科技功能', subInfo: '发快速出售' },
  { title: 'xx图鉴', info: '黑科技功能', subInfo: '发快速出售' },
  { title: 'xx喜好表', info: '黑科技功能', subInfo: '发快速出售' }
])

const feedTabs = ref([
  { name: 'recommend', label: '推荐' },
  { name: 'latest', label: '最新' },
  { name: 'tab3', label: '未选' },
  { name: 'tab4', label: '未选' },
  { name: 'tab5', label: '未选' },
  { name: 'tab6', label: '未选' }
])

const leftPosts = ref([
  { image: 'https://via.placeholder.com/174x130', text: '留作纪念！', iconVideo: true, size: 'Small(4:3)' as const },
  { image: 'https://via.placeholder.com/174x232', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Large(3:4)' as const },
  { image: 'https://via.placeholder.com/174x174', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Medium(4:3~3:4)' as const }
])

const rightPosts = ref([
  { image: 'https://via.placeholder.com/174x232', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Large(3:4)' as const },
  { image: 'https://via.placeholder.com/174x174', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Medium(4:3~3:4)' as const },
  { image: 'https://via.placeholder.com/174x130', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Small(4:3)' as const },
  { title: '这是标题这是标题', content: '大家好，我是青门引的楚梵...', text: '留作纪念！', tagDebut: true, size: 'Small(4:3)' as const }
])

const tabBarItems = ref([
  { icon: 'home-normal', label: '岛' },
  { icon: 'discovery-normal', label: '发现' },
  { icon: 'b2c-qihuo-normal', label: '商城' },
  { icon: 'im-normal', label: '消息', badge: 35 },
  { icon: 'me-normal', label: '我的' }
])

const handleFABClick = () => {
  console.log('FAB clicked')
}
</script>
