<script setup lang="ts">
import { DuAvatar } from 'dangoui'

defineProps<{
  avatars?: string[]
  max?: number
  size?: 'mini' | 'small' | 'normal'
}>()

const getSizeClass = (size?: string) => {
  switch (size) {
    case 'mini': return 20
    case 'small': return 24
    default: return 32
  }
}
</script>

<template>
  <div class="flex items-center" style="margin-left: -8px;">
    <template v-if="avatars">
      <DuAvatar
        v-for="(avatar, index) in avatars.slice(0, max || 5)"
        :key="index"
        :src="avatar"
        :size="getSizeClass(size)"
        class="border-2px border-[var(--bg-1,#ffffff)] -ml-8px first:ml-0"
      />
      <div
        v-if="avatars.length > (max || 5)"
        class="flex items-center justify-center rounded-full bg-[var(--bg-2,#f7f7f9)] -ml-8px border-2px border-[var(--bg-1,#ffffff)]"
        :style="{ width: `${getSizeClass(size)}px`, height: `${getSizeClass(size)}px` }"
      >
        <span class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px">+{{ avatars.length - (max || 5) }}</span>
      </div>
    </template>
    <slot v-else />
  </div>
</template>
