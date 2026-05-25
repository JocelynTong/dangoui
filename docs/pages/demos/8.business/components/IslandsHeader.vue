<template>
  <div class="flex flex-col w-full bg-[var(--du-secondary-solid-bg)]">
    <!-- Status Bar (59px) -->
    <StatusBar :time="props.time" color="white" type="iPhone14pro" />

    <!-- Navigation Bar (44px) -->
    <DuNavigationBar
      transparent
      :back="false"
      transparent-front-color="white"
    >
      <template #left>
        <div class="flex items-center justify-center w-[53px] h-full">
          <div class="flex items-center justify-center gap-px h-[20px] w-[37px]">
            <img :src="logoUrl1" class="w-[18px] h-[20px] shrink-0" alt="logo1" />
            <img :src="logoUrl2" class="w-[18px] h-[20px] shrink-0" alt="logo2" />
          </div>
        </div>
      </template>

      <template #default>
        <DuSearch placeholder="Labubu泰坦" readonly class="flex-1">
          <template #left>
            <DuIcon name="search" :size="18" />
          </template>
          <template #right>
            <DuDivider type="vertical" />
            <DuIcon name="camera" :size="18" />
          </template>
        </DuSearch>
      </template>

      <template #right>
        <DuIconButton
          name="hamburger"
          text="发现岛"
          color="white"
          size="medium"
          @click="() => {}"
        />
      </template>
    </DuNavigationBar>
  </div>
</template>

<script setup lang="ts">
import StatusBar from './StatusBar.vue'
import { DuNavigationBar, DuSearch, DuIconButton, DuDivider, DuIcon } from 'dangoui'

const props = withDefaults(defineProps<{
  time?: string
}>(), {
  time: '11:27',
})

const logoUrl1 = 'https://www.figma.com/api/mcp/asset/56b8816a-716c-4ac4-b1e1-5a7d78ff1dbd'
const logoUrl2 = 'https://www.figma.com/api/mcp/asset/f08fdd49-7dbf-4991-b4a9-2af26f484a44'
const searchIconUrl = 'https://www.figma.com/api/mcp/asset/5f362e77-87c6-4e1f-a022-76065f3723da'
const cameraIconUrl = 'https://www.figma.com/api/mcp/asset/6a89d708-dcee-4434-a7ba-33333088d6c2'
const hamburgerUrl = 'https://www.figma.com/api/mcp/asset/5d49b6ac-986e-450e-916e-4ef322a9f737'
</script>

<style scoped>
</style>