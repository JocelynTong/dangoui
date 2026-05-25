
<template>
  <PreviewBlock>
    <DuButton @click="switchLoading">切换 Loading</DuButton>
    <DuSkeleton class="w-100" :loading="loading">
      <template #template>
        <div class="flex flex-col gap-2">
          <DuSkeletonParagraph />
          <DuSkeletonParagraph :row-height="24" row-width="50%" />
          <DuSkeletonAvatar />
          <DuSkeletonRectangle aspect-ratio="3/4" />
        </div>
      </template>
      <div>
        要展示的内容
      </div>
    </DuSkeleton>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { DuButton, DuSkeleton, DuSkeletonParagraph, DuSkeletonAvatar, DuSkeletonRectangle } from 'dangoui'

const loading = ref(true)

function switchLoading() {
  loading.value = !loading.value
  setTimeout(() => {
    loading.value = !loading.value
  }, 1000)
}


</script>
