
<template>
  <PreviewBlock title="多维度多分组筛选">
    <DuButton @click="handleShow" full size="large">打开筛选</DuButton>
    <DuDropdown
      :options="options"
      v-model:value="value"
      v-model:visible="visible"
      @confirm="handleConfirm"
    />
    <!-- 分组展示结果 -->
    <div v-if="Object.keys(value).length > 0" class="complex-result">
      <div class="result-header">
        <h4>筛选结果</h4>
        <DuButton type="text" size="small" @click="clearAll">清空全部</DuButton>
      </div>
      <div class="result-content">
        <template v-for="(items, key) in value" :key="key">
          <div v-if="hasSelectedItems(items)" class="result-option">
            <div class="option-header">
              <span class="option-label">{{ getOptionLabel(key) }}</span>
            </div>
            <!-- 处理直接options的情况 -->
            <template v-if="!hasGroups(key)">
              <div class="option-tags">
                <DuTag 
                  v-for="item in items"
                  :key="item.value"
                  size="small"
                  color="primary"
                  closeable
                  @close="() => handleTagClick(key, item)"
                >
                  {{ item.label }}
                </DuTag>
              </div>
            </template>
            <!-- 处理groups的情况 -->
            <template v-else>
              <div class="groups-container">
                <template v-for="(values, groupKey) in items" :key="groupKey">
                  <div v-if="values.length > 0" class="group-item">
                    <div class="group-header">
                      <span class="group-label">{{ getGroupLabel(key, groupKey) }}</span>
                    </div>
                    <div class="group-tags">
                      <DuTag 
                        v-for="item in values"
                        :key="item.value"
                        size="small"
                        color="primary"
                        closeable
                        @close="() => handleTagClick(key, item)"
                      >
                        {{ item.label }}
                      </DuTag>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuButton, DuTag,DuDropdown } from 'dangoui'

const value = ref({})
const visible = ref(false)

function hasSelectedItems(items: any) {
  if(Array.isArray(items)) return items.length>0
  return Object.values(items).some(group => (group as any[]).length > 0)
}

function getOptionLabel(key: string) {
  return options.find(opt => opt.value === key)?.label || key
}

function hasGroups(key: string) {
  const option = options.find(opt => opt.value === key)
  return option && 'groups' in option
}

function getGroupLabel(optionKey: string, groupKey: string) {
  const option = options.find(opt => opt.value === optionKey)
  if (!option || !('groups' in option)) return groupKey
  
  const group = option.groups.find(g => g.value === groupKey)
  return group?.label || groupKey
}

function handleTagClick(optionKey: string, item: any) {
  const option = options.find(opt => opt.value === optionKey)
  if (!option) return
  if ('options' in option) {
    const currentOptions = value.value[optionKey] || []
    const index = currentOptions.findIndex((opt: any) => opt.value === item.value)
    if (index > -1) {
      currentOptions.splice(index, 1)
      if (currentOptions.length === 0) {
        delete value.value[optionKey]
      }
    }
  } else {
    const groups = value.value[optionKey] || {}
    Object.entries(groups).forEach(([groupKey, options]: [string, any]) => {
      const index = options.findIndex((opt: any) => opt.value === item.value)
      if (index > -1) {
        options.splice(index, 1)
        if (options.length === 0) {
          delete groups[groupKey]
        }
        if (Object.keys(groups).length === 0) {
          delete value.value[optionKey]
        }
      }
    })
  }
}

function handleShow() {
  visible.value = true
}

function handleConfirm(selected: any) {
  console.log('选中的选项：', selected)
}

function clearAll() {
  value.value = {}
}

const options = [
  {
    label: '商品分类',
    value: 'category',
    groups: [
      {
        label: '食品饮料',
        value: 'food_drink',
        multiple: true,
        options: [
          { label: '零食小吃', value: 'snacks' },
          { label: '饮料冲调', value: 'drinks' },
          { label: '生鲜果蔬', value: 'fresh' },
          { label: '粮油调味', value: 'condiment' }
        ]
      },
      {
        label: '服装鞋包',
        value: 'clothing_bags',
        multiple: true,
        options: [
          { label: '上衣', value: 'tops' },
          { label: '裤装', value: 'pants' },
          { label: '裙装', value: 'dresses' },
          { label: '箱包', value: 'bags' }
        ]
      }
    ]
  },
  {
    label: '价格区间',
    value: 'price_range',
    multiple: false,
    options: [
      { label: '50元以下', value: '0-50' },
      { label: '50-100元', value: '50-100' },
      { label: '100-200元', value: '100-200' },
      { label: '200-500元', value: '200-500' },
      { label: '500元以上', value: '500+' }
    ]
  },
  {
    label: '商品属性',
    value: 'product_attrs',
    groups: [
      {
        label: '优惠活动',
        value: 'promotions',
        multiple: true,
        options: [
          { label: '限时特惠', value: 'time_limited' },
          { label: '满减优惠', value: 'full_reduction' },
          { label: '会员专享', value: 'vip_only' },
          { label: '赠品活动', value: 'gift' }
        ]
      },
      {
        label: '配送方式',
        value: 'delivery',
        multiple: false,
        options: [
          { label: '包邮', value: 'free_shipping' },
          { label: '极速达', value: 'fast_delivery' },
          { label: '同城配送', value: 'local_delivery' }
        ]
      }
    ]
  }
]
</script>

<style scoped>
.complex-result {
  border: 1px solid #eee;
  border-radius: 8px;
  width: 100%;
  background: #fff;
  padding: 12px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-header h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-option {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-label {
  font-size: 14px;
  font-weight: 500;
}

.option-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 0;
}

.groups-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 12px;
}

.group-header {
  display: flex;
  align-items: center;
}

.group-label {
  font-size: 13px;
}

.group-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.du-tag) {
  cursor: pointer;
  transition: all 0.2s;
}

:deep(.du-tag:hover) {
  opacity: 0.85;
}
</style>
