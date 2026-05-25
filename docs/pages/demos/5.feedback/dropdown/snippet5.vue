
<template>
  <PreviewBlock title="自定义样式">
    <DuButton @click="handleShow" full size="large">打开筛选</DuButton>
    <DuDropdown
      :options="options"
      v-model:value="value"
      v-model:visible="visible"
      @confirm="handleConfirm"
    >
      <!-- 自定义选择栏 -->
      <template #option-nav="{ options, currentIndex, onChange }">
        <div class="custom-nav">
          <div
            v-for="(option, index) in options"
            :key="option.value"
            :class="['custom-nav-item', { active: currentIndex === index }]"
            @click="onChange(index)"
          >
            <DuIcon name="like-normal" :size="12" />
            <span>{{ option.label }}</span>
          </div>
        </div>
      </template>
      <!-- 自定义内容区域 -->
      <template #content="{ currentOption, currentGroups, isSelected, onSelect }">
        <div class="custom-content">
          <div
            v-for="group in currentGroups"
            :key="group.value"
            class="custom-group"
          >
            <div v-if="currentGroups?.length > 1" class="custom-group-title">
              {{ group.label }}
            </div>
            <div class="custom-options">
              <div
                v-for="option in group.options"
                :key="option.value"
                :class="['custom-option', { active: isSelected(option, group) }]"
                @click="onSelect(option, group)"
              >
                <DuIcon name="wishing" :size="12" />
                <span>{{ option.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DuDropdown>
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
import { DuButton, DuTag, DuIcon, DuDropdown } from 'dangoui'

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
    multiple: true,
    options: [
      { label: '数码产品', value: 'digital' },
      { label: '家居用品', value: 'home' },
      { label: '服装鞋包', value: 'clothing' },
      { label: '美妆护肤', value: 'beauty' },
      { label: '食品饮料', value: 'food' }
    ]
  },
  {
    label: '价格区间',
    value: 'price',
    multiple: false,
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
/* 基础样式 */
.custom-nav,
.custom-nav-item,
.custom-option {
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 导航栏样式 */
.custom-nav {
  padding: 4px;
  box-shadow: inset 0 0 0 1px #eee;
}

.custom-nav-item {
  flex: 1;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.custom-nav-item:hover:not(.active),
.custom-option:hover:not(.active) {
  color: #ff4d8c;
  border-color: #ff4d8c;
}

.custom-nav-item.active,
.custom-option.active {
  color: #ff4d8c;
  background: rgba(255, 77, 140, 0.08);
  border-color: #ff4d8c;
  font-weight: 600;
}

/* 内容区域样式 */
.custom-content {
  padding: 16px;
}

.custom-group {
  margin-bottom: 16px;
}

.custom-group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.custom-group-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}

.custom-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.custom-option {
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #eee;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

/* 图标样式 */
:deep(.du-icon) {
  font-size: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-nav-item:hover :deep(.du-icon),
.custom-option:hover :deep(.du-icon) {
  color: #ff4d8c;
  transform: scale(1.1);
}

/* 结果展示样式 */
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
