<template>
  <div class="rounded-[8px] overflow-hidden cursor-pointer" @click="handleClick">
    <DuImage :src="image" width="100%" height="auto" mode="widthFix" radius="8px" />
    <div class="flex gap-[4px] justify-center py-[4px]">
      <div
        v-for="(_, index) in indicators"
        :key="index"
        class="w-[24px] h-[2px] rounded-[1px]"
        :class="index === activeIndex ? 'bg-white' : 'bg-[rgba(255,255,255,0.4)]'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuImage } from 'dangoui'

withDefaults(defineProps<{
  image?: string
  indicators?: number
}>(), {
  image: 'https://via.placeholder.com/174x120',
  indicators: 5
})

const activeIndex = ref(2)

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
