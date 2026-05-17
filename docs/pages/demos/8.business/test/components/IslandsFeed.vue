<template>
  <div class="flex flex-col gap-[4px] rounded-t-[8px]">
    <DuTabs v-model:value="activeTab" size="large">
      <DuTab v-for="tab in tabs" :key="tab.name" :name="tab.name">{{ tab.label }}</DuTab>
    </DuTabs>
    <div class="flex gap-[8px] px-[8px]">
      <div class="flex flex-col gap-[8px] flex-1">
        <IslandsFeedAd v-if="showAd" :image="adImage" @click="handleAdClick" />
        <FeedPost
          v-for="(post, index) in leftPosts"
          :key="'left-' + index"
          :image="post.image"
          :text="post.text"
          :title="post.title"
          :content="post.content"
          :user-name="post.userName"
          :avatar-src="post.avatarSrc"
          :like-count="post.likeCount"
          :icon-video="post.iconVideo"
          :tag-debut="post.tagDebut"
          :size="post.size"
          @click="handlePostClick(index, 'left')"
        />
      </div>
      <div class="flex flex-col gap-[8px] flex-1">
        <FeedPost
          v-for="(post, index) in rightPosts"
          :key="'right-' + index"
          :image="post.image"
          :text="post.text"
          :title="post.title"
          :content="post.content"
          :user-name="post.userName"
          :avatar-src="post.avatarSrc"
          :like-count="post.likeCount"
          :icon-video="post.iconVideo"
          :tag-debut="post.tagDebut"
          :size="post.size"
          @click="handlePostClick(index, 'right')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuTabs, DuTab } from 'dangoui'
import FeedPost from './FeedPost.vue'
import IslandsFeedAd from './IslandsFeedAd.vue'

interface PostItem {
  image?: string
  text?: string
  title?: string
  content?: string
  userName?: string
  avatarSrc?: string
  likeCount?: number
  iconVideo?: boolean
  tagDebut?: boolean
  size?: 'Small(4:3)' | 'Medium(4:3~3:4)' | 'Large(3:4)'
}

interface TabItem {
  name: string
  label: string
}

withDefaults(defineProps<{
  tabs?: TabItem[]
  showAd?: boolean
  adImage?: string
  leftPosts?: PostItem[]
  rightPosts?: PostItem[]
}>(), {
  tabs: () => [
    { name: 'recommend', label: '推荐' },
    { name: 'latest', label: '最新' },
    { name: 'tab3', label: '未选' },
    { name: 'tab4', label: '未选' },
    { name: 'tab5', label: '未选' },
    { name: 'tab6', label: '未选' }
  ],
  showAd: true,
  adImage: 'https://via.placeholder.com/174x120',
  leftPosts: () => [
    { image: 'https://via.placeholder.com/174x130', text: '留作纪念！', iconVideo: true, size: 'Small(4:3)' },
    { image: 'https://via.placeholder.com/174x232', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Large(3:4)' },
    { image: 'https://via.placeholder.com/174x174', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Medium(4:3~3:4)' }
  ],
  rightPosts: () => [
    { image: 'https://via.placeholder.com/174x232', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Large(3:4)' },
    { image: 'https://via.placeholder.com/174x174', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Medium(4:3~3:4)' },
    { image: 'https://via.placeholder.com/174x130', text: '留作纪念！', iconVideo: true, tagDebut: true, size: 'Small(4:3)' },
    { title: '这是标题这是标题', content: '大家好，我是青门引的楚梵...', text: '留作纪念！', tagDebut: true, size: 'Small(4:3)' }
  ]
})

const activeTab = ref('recommend')

const emit = defineEmits<{
  adClick: []
  postClick: [index: number, column: 'left' | 'right']
}>()

const handleAdClick = () => {
  emit('adClick')
}

const handlePostClick = (index: number, column: 'left' | 'right') => {
  emit('postClick', index, column)
}
</script>
