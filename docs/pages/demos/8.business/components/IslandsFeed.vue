<script setup lang="ts">
import { DuTabs, DuTab } from 'dangoui'
import { PostCard, POST_COVER_TYPE } from '../../../../../qiandao-ui/pkg/ui/post-card'

const props = withDefaults(defineProps<{
  type?: '2Column' | '1Column'
  leftList?: Array<{
    id: string
    cover: string
    coverType?: typeof POST_COVER_TYPE
    title: string
    avatar: string
    nickname: string
    star: number
    starred?: boolean
    size?: 'Small' | 'Medium' | 'Large'
  }>
  rightList?: Array<{
    id: string
    cover: string
    coverType?: typeof POST_COVER_TYPE
    title: string
    avatar: string
    nickname: string
    star: number
    starred?: boolean
    size?: 'Small' | 'Medium' | 'Large'
  }>
}>(), {
  type: '2Column',
  leftList: () => [
    { id: '1', cover: 'https://picsum.photos/174/200', coverType: POST_COVER_TYPE.IMAGE, title: '晒图', avatar: 'https://picsum.photos/48/48', nickname: '用户A', star: 100, starred: false, size: 'Small' },
    { id: '2', cover: 'https://picsum.photos/174/280', coverType: POST_COVER_TYPE.IMAGE, title: '晒图2', avatar: 'https://picsum.photos/48/48', nickname: '用户B', star: 200, starred: true, size: 'Large' },
  ],
  rightList: () => [
    { id: '3', cover: 'https://picsum.photos/174/200', coverType: POST_COVER_TYPE.IMAGE, title: '晒图3', avatar: 'https://picsum.photos/48/48', nickname: '用户C', star: 50, starred: false, size: 'Medium' },
    { id: '4', cover: 'https://picsum.photos/174/200', coverType: POST_COVER_TYPE.IMAGE, title: '晒图4', avatar: 'https://picsum.photos/48/48', nickname: '用户D', star: 300, starred: false, size: 'Medium' },
  ],
})

const tabs = ['关注', '推荐', '热度']
const activeTab = 0
</script>

<template>
  <div class="islands-feed flex flex-col w-full gap-[8px]">
    <!-- Tabs -->
    <DuTabs value="1" class="px-[10px]">
      <DuTab v-for="(tab, i) in tabs" :key="i" :name="String(i + 1)" class="text-[14px]">{{ tab }}</DuTab>
    </DuTabs>

    <!-- 双列 Feed -->
    <div v-if="props.type !== '1Column'" class="flex gap-[8px] px-[10px]">
      <!-- 左列 -->
      <div class="flex flex-col gap-[8px] w-[174px]">
        <div v-for="item in props.leftList" :key="item.id" class="rounded-[8px] overflow-hidden">
          <PostCard
            :cover="item.cover"
            :cover-type="item.coverType"
            :title="item.title"
            :avatar="item.avatar"
            :nickname="item.nickname"
            :star="item.star"
            :starred="item.starred"
          />
        </div>
      </div>
      <!-- 右列 -->
      <div class="flex flex-col gap-[8px] w-[174px]">
        <div v-for="item in props.rightList" :key="item.id" class="rounded-[8px] overflow-hidden">
          <PostCard
            :cover="item.cover"
            :cover-type="item.coverType"
            :title="item.title"
            :avatar="item.avatar"
            :nickname="item.nickname"
            :star="item.star"
            :starred="item.starred"
          />
        </div>
      </div>
    </div>

    <!-- 单列 Feed -->
    <div v-else class="flex flex-col gap-[8px] px-[10px]">
      <div v-for="item in [...props.leftList, ...props.rightList]" :key="item.id" class="rounded-[8px] overflow-hidden">
        <PostCard
          :cover="item.cover"
          :cover-type="item.coverType"
          :title="item.title"
          :avatar="item.avatar"
          :nickname="item.nickname"
          :star="item.star"
          :starred="item.starred"
        />
      </div>
    </div>
  </div>
</template>