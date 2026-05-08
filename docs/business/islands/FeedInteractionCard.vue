<template>
  <div class="bg-[#6a5538] rounded-8px p-12px relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-20">
      <slot name="background" />
    </div>

    <!-- 内容 -->
    <div class="relative z-10">
      <!-- 标题 -->
      <span class="text-[var(--bg-1,#ffffff)] text-16px font-500 leading-24px block">{{ title }}</span>

      <!-- 副标题 -->
      <span class="text-[var(--bg-1,#ffffff)] text-11px font-400 leading-13px block mt-4px">
        {{ subtitle }}
      </span>

      <!-- 头像组 -->
      <div v-if="avatars.length" class="flex items-center mt-8px" style="gap: -8px">
        <DuAvatarGroup :list="avatarList" size="mini" :max="5" />
      </div>

      <!-- 操作按钮 -->
      <DuButton color="secondary" size="normal" class="mt-12px" @click="handleClick">
        {{ buttonText }}
      </DuButton>
      <DuBadge v-if="badge" :value="badge" class="absolute top-12px right-12px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuButton, DuAvatarGroup, DuBadge } from 'dangoui'

interface Props {
  title: string
  subtitle: string
  buttonText?: string
  badge?: string
  avatars?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: '标记并分享',
  avatars: () => [],
})

const emit = defineEmits<{
  click: []
}>()

const avatarList = computed(() =>
  props.avatars.map(src => ({ src }))
)

const handleClick = () => {
  emit('click')
}
</script>
