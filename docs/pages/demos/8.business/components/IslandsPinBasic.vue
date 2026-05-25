<script setup lang="ts">
import { DuBadge, DuIcon } from 'dangoui'
import Tag from './Tag.vue'

const props = withDefaults(defineProps<{
  type?: 'Home' | 'Islands' | 'MyIslands' | 'Empty'
  selected?: boolean
  badge?: boolean
}>(), {
  type: 'Home',
  selected: false,
  badge: false,
})

const emit = defineEmits<{
  'update:selected': [value: boolean]
}>()

const toggle = () => emit('update:selected', !props.selected)
</script>

<template>
  <div
    class="islands-pin-basic flex flex-col gap-[8px] items-center relative w-[68px] h-[85px] py-[8px] cursor-pointer"
    @click="toggle"
  >
    <!-- Badge -->
    <div v-if="badge && type === 'Islands'" class="absolute top-[-4px] right-[-4px] z-10">
      <DuBadge type="NumberReddot" />
    </div>

    <!-- Contents -->
    <div
      class="contents rounded-[8px] w-[48px] h-[48px] flex items-center justify-center bg-[var(--white-3,rgba(255,255,255,0.12))]"
      :class="{ 'is-selected': selected }"
    >
      <!-- Type=Home: home icon -->
      <template v-if="type === 'Home'">
        <div class="w-[48px] h-[48px] flex items-center justify-center gap-[1.5px]">
          <div class="h-[14px] w-[13.072px] relative shrink-0">
            <img class="absolute inset-0 w-full h-full" src="https://www.figma.com/api/mcp/asset/3d409231-f587-4bef-bf55-9b29a4cf8534" alt="" />
          </div>
          <div class="h-[14px] w-[13.229px] relative shrink-0">
            <img class="absolute inset-0 w-full h-full" src="https://www.figma.com/api/mcp/asset/848928e0-b64e-4a63-97ce-4fb67080e3f5" alt="" />
          </div>
        </div>
      </template>

      <!-- Type=Islands: Tag -->
      <template v-else-if="type === 'Islands'">
        <Tag size="Medium" />
      </template>

      <!-- Type=MyIslands: Icon all -->
      <template v-else-if="type === 'MyIslands'">
        <DuIcon name="all" :size="24" color="#ffffff" />
      </template>
    </div>

    <!-- Text -->
    <span class="text-[var(--bg-1,#ffffff)] text-[10px] font-[500] leading-[11px] text-center flex-1">
      <slot>名称</slot>
    </span>

    <!-- Bubble slot -->
    <slot name="bubble" />
  </div>
</template>

<style scoped>
.contents.is-selected {
  outline: 2px solid var(--primary-5, #7c66ff);
  outline-offset: 3px;
}
</style>