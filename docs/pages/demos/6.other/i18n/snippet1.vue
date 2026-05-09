
<template>
  <PreviewBlock title="支持展开收起">
    <DuButton @click="switchLanguage">切换 {{ locale === 'zh_CN' ? 'English' : '中文' }}</DuButton>
    <DuTagsPanel
      :tags="tags"
      @add="handleAddClick"
      @remove="handleRemove"
      :collapse-count="5"
      can-toggle
    />
  </PreviewBlock>

</template>

<script setup lang="ts">
import { DuTagsPanel, DuButton } from 'dangoui'
import { useLocale } from 'dangoui/locale'
import enUS from 'dangoui/lang/en_US'
import zhCN from 'dangoui/lang/zh_CN'

const { registerLocale, locale } = useLocale()

registerLocale('en_US', enUS)
registerLocale('zh_CN', zhCN)

const tags = ['你好', 'Hello', '안녕하세요', 'Bonjour', 'こんにちは', 'Hallo'].map(text => ({ value: text, text, canRemove: text !== '你好' }))

function handleAddClick() {
  console.log('[demo] add click')
}

function handleRemove(item) {
  console.log('[demo] remove', item.value)
}

function switchLanguage() {
  console.log('[demo] change to english')
  locale.value = (locale.value === 'zh_CN' ? 'en_US' : 'zh_CN')
  console.log('[demo] locale', locale.value)
}
</script>
