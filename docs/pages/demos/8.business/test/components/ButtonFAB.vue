<template>
  <div class="fixed right-[16px] bottom-[100px] z-50">
    <div class="bg-[var(--primary-5,#7c66ff)] rounded-[40px] flex gap-[4px] items-center py-[12px] px-[16px] shadow-lg" @click="handleClick">
      <DuIcon name="plus-heavy" size="15px" color="white" />
      <span class="text-white text-[14px] font-[500]">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DuIcon } from 'dangoui'

withDefaults(defineProps<{
  text?: string
}>(), {
  text: '发布'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>
