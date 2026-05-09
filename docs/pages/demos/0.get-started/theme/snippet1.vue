
<template>
  <PreviewBlock title="传递 success">
    <div class="flex flex-col gap-8px">
      <DuButton color="success">完成</DuButton>
      <DuSwitch color="success" on />
    </div>
  </PreviewBlock>
  <PreviewBlock title="传递 secondary">
    <div class="flex flex-col gap-8px">
      <DuButton color="secondary">完成</DuButton>
      <DuSwitch color="secondary" on />
    </div>
  </PreviewBlock>
  <PreviewBlock title="传递 trade（扩展色板）">
    <DuTheme name="qd">
      <div class="flex flex-col gap-8px">
        <DuButton color="trade">完成</DuButton>
        <DuSwitch color="trade" on />
      </div>
    </DuTheme>
  </PreviewBlock>
  <PreviewBlock title="使用 DuTheme 切换主题">
    <DuTheme :name="theme">
      <DuRadioGroup v-model:value="theme">
        <DuRadio label="千岛" value="qd" />
        <DuRadio label="千岛暗黑" value="qd-dark" />
        <DuRadio label="奇货" value="qh" />
        <DuRadio label="奇货暗黑" value="qh-dark" />
        <DuRadio label="商家助手" value="qdm" />
        <DuRadio label="米花" value="mihua" />
        <DuRadio label="米花暗黑" value="mihua-dark" />
        <DuRadio label="临界" value="linjie" />
        <DuRadio label="临界暗黑" value="linjie-dark" />
      </DuRadioGroup>
      <div class="flex flex-col gap-8px mt-16px">
        <DuButton color="primary">选择我的兴趣</DuButton>
        <DuSwitch color="primary" on />
        <DuSwitch color="primary" on disabled />
      </div>
    </DuTheme>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DuButton, DuSwitch, DuTheme, DuRadio, DuRadioGroup } from 'dangoui'

const theme = ref('qd')
</script>
