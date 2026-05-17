<template>
  <div class="flex flex-col">
    <StatusBar :time="time" color="White" />
    <DuNavigationBar color="white" :back="false">
      <template #left>
        <DuIconButton name="islands" size="medium" color="white" text="发现岛" />
      </template>
      <div class="flex-auto w-0">
        <DuSearch bg="rgba(255,255,255,0.12)" :placeholder="placeholder" readonly>
          <template #right>
            <DuIcon name="camera" size="18px" color="white" />
            <DuDivider type="vertical" />
            <span class="text-white text-[12px]">识物</span>
          </template>
        </DuSearch>
      </div>
      <template #right>
        <DuIconButton name="hamburger" color="white" />
      </template>
    </DuNavigationBar>
  </div>
</template>

<script setup lang="ts">
import { DuNavigationBar, DuSearch, DuIcon, DuIconButton, DuDivider } from 'dangoui'
import StatusBar from './StatusBar.vue'

withDefaults(defineProps<{
  time?: string
  placeholder?: string
}>(), {
  time: '11:27',
  placeholder: 'Labubu泰坦'
})
</script>
