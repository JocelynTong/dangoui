<script setup lang="ts">
defineProps<{
  items?: Array<{
    type: string
    title?: string
    subtitle?: string
    price?: string
    image?: string
    tag?: string
  }>
}>()
</script>

<template>
  <div class="flex flex-col gap-8px items-center w-full">
    <div class="flex gap-8px overflow-x-auto w-full" style="scrollbar-width: none;">
      <slot>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="bg-[var(--bg-2,#f7f7f9)] rounded-8px flex justify-between pt-8px pb-4px pl-8px pr-6px w-105px h-62px shrink-0 relative"
        >
          <div class="flex flex-col gap-6px justify-center flex-1">
            <span class="text-[var(--icon-1,#2b263b)] text-15px font-1000 leading-12px">{{ item.type }}</span>
            <div class="flex flex-col gap-2px">
              <span v-if="item.subtitle" class="text-[var(--text-3,rgba(0,0,0,0.4))] text-10px font-400 leading-11px">{{ item.subtitle }}</span>
              <span v-if="item.price" class="text-[var(--error-5,#f96464)] text-12px font-500 leading-18px">{{ item.price }}</span>
            </div>
          </div>
          <div class="rounded-4px w-33px h-44px bg-[var(--bg-3,#ededf0)]">
            <img v-if="item.image" :src="item.image" class="w-full h-full object-cover rounded-4px" />
          </div>
          <div v-if="item.tag" class="bg-[var(--error-6,#d94a4e)] rounded-4px flex justify-center items-center py-2px px-3px absolute top-0 right-0">
            <span class="text-[var(--bg-1,#ffffff)] text-10px font-500 leading-11px">{{ item.tag }}</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
