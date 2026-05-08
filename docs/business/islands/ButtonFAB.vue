<template>
  <div
    class="fixed w-56px h-56px rounded-full flex items-center justify-center shadow-lg cursor-pointer z-20"
    :class="[positionClass, colorClass]"
    @click="handleClick"
  >
    <DuIcon :name="icon" :size="24" color="#fff" />
    <span v-if="label" class="text-[var(--bg-1,#ffffff)] text-12px font-500 ml-4px">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DuIcon } from 'dangoui'

interface Props {
  icon?: string
  label?: string
  color?: 'primary' | 'secondary' | 'error'
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left'
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'plus',
  color: 'primary',
  position: 'bottom-right',
})

const emit = defineEmits<{
  click: []
}>()

const positionClass = computed(() => {
  const positions = {
    'bottom-right': 'bottom-80px right-12px',
    'bottom-center': 'bottom-80px left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-80px left-12px',
  }
  return positions[props.position]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'bg-[var(--primary-5,#7c66ff)]',
    secondary: 'bg-[var(--text-1,#000000)]',
    error: 'bg-[var(--error-6,#d94a4e)]',
  }
  return colors[props.color]
})

const handleClick = () => {
  emit('click')
}
</script>
