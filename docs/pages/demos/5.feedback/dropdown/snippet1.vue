
<template>
  <PreviewBlock title="单维度筛选">
    <DuButton @click="handleShow" full size="large">选择价格区间</DuButton>
    <DuDropdown
      :options="options"
      v-model:value="value"
      v-model:visible="visible"
      @confirm="handleConfirm"
    />
    <!-- 结果展示 -->
    <div v-if="Object.keys(value)?.length > 0" class="result-display">
      <template v-for="(items, key) in value" :key="key">
        <div class="result-group">
          <div class="result-label">{{options.find(item=>item.value === key).label}}:</div>
          <div class="result-tags">
            <template v-for="values in items" :key="groupKey">
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
    label: '价格区间',
    value: 'price',
    multiple: true,
    options: [
      { label: '50元以下', value: '0-50' },
      { label: '50-100元', value: '50-100' },
      { label: '100-200元', value: '100-200' },
      { label: '200-500元', value: '200-500' },
      { label: '500元以上', value: '500+' }
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

.result-label{
  width:100px
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.result-tag {
  margin-right: 4px;
}
</style>
