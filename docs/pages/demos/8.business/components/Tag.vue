<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'Large' | 'Medium' | 'Normal' | 'Small' | 'Mini'
  border?: boolean
  checked?: boolean
  whiteBg?: boolean
}>(), {
  size: 'Normal'
})

const sizeMap = {
  Large: { size: 56, radius: '8px' },
  Medium: { size: 48, radius: '8px' },
  Normal: { size: 32, radius: '4px' },
  Small: { size: 24, radius: '4px' },
  Mini: { size: 16, radius: '2px' },
}
</script>

<template>
  <div
    class="relative inline-flex overflow-hidden"
    :style="{ width: `${sizeMap[size].size}px`, height: `${sizeMap[size].size}px`, borderRadius: sizeMap[size].radius }"
  >
    <!-- WhiteBG -->
    <div
      v-if="whiteBg"
      class="absolute inset-0"
      :style="{ borderRadius: sizeMap[size].radius }"
    />

    <!-- Tag image -->
    <img
      class="absolute inset-0 w-full h-full"
      :src="`https://www.figma.com/api/mcp/asset/${size === 'Large' ? 'ea4a359b-e329-4356-9b46-8f961f7f5cba' : size === 'Medium' ? '79e61112-2e2e-4029-b306-e5b87497a9de' : size === 'Normal' ? 'beb46082-b984-4d97-aecb-68b9163a74b3' : size === 'Small' ? 'd4438f49-1078-4587-ac50-b7cab6380ff6' : '2f317cbc-0636-44a8-a9b1-c93d462e634d'}`"
      alt=""
    />

    <!-- Border -->
    <div
      v-if="border"
      class="absolute inset-0 pointer-events-none"
      :style="{
        borderRadius: sizeMap[size].radius,
        border: '0.5px solid rgba(0,0,0,0.04)'
      }"
    />

    <!-- Checked overlay (Checkbox) -->
    <div
      v-if="checked && (size === 'Large' || size === 'Medium')"
      class="absolute border border-[var(--primary-5,#7c66ff)] flex items-start justify-end p-[4px]"
      style="inset: -4.17%; border-radius: 10px;"
    >
      <div class="w-[20px] h-[20px] relative">
        <img class="absolute inset-0" src="https://www.figma.com/api/mcp/asset/a730778d-5c61-43e1-88b2-19edbf82f832" alt="" />
        <img class="absolute inset-0" src="https://www.figma.com/api/mcp/asset/23201ba8-066a-4d7f-bc83-3b45786dead0" alt="" />
      </div>
    </div>
  </div>
</template>