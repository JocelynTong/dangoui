
<template>
  <PreviewBlock title="列表布局">
    <DuButton @click="handleShow" full size="large">选择商品类型</DuButton>
    <DuDropdown
      :options="options"
      v-model:value="value"
      v-model:visible="visible"
      :show-footer="false"
      layout="list"
      @confirm="handleConfirm"
    />
    <!-- 结果展示 -->
    <div v-if="Object.keys(value)?.length > 0" class="result-display">
      <template v-for="(items, key) in value" :key="key">
        <div class="result-group">
          <div class="result-label">{{options.find(item=>item.value === key).label}}:</div>
          <div class="result-tags">
            <template v-for="values in items" :key="values.value">
              <DuTag 
                size="small"
                class="result-tag"
              >
                {{ values.label }}
              </DuTag>
            </template>
          </div>
        </div>
      </template>
    </div>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuButton, DuTag, DuDropdown } from 'dangoui'
const value = ref({})
const visible = ref(false)

function handleShow() {
  visible.value = true
}

function handleConfirm(selected) {
  console.log('选中的选项：', selected)
}

const options = [
  {
    label: '商品类型',
    value: 'type',
    multiple: false,
    options: [
      { label: '数码产品', value: 'digital' },
      { label: '家居用品', value: 'home' },
      { label: '服装鞋包', value: 'clothing' },
      { label: '美妆护肤', value: 'beauty' },
      { label: '食品饮料', value: 'food' }
    ]
  }
]
</script>

<style scoped>
.result-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  font-size: 14px;
}

.result-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.result-label {
  width: 100px;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
