
<template>
  <PreviewBlock title="primary">
    <DuSteps
      color="primary"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="secondary">
    <DuSteps
      color="secondary"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="success">
    <DuSteps
      color="success"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="warning">
    <DuSteps
      color="warning"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="error">
    <DuSteps
      color="error"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="trade">
    <DuSteps
      color="trade"
      :steps="basicSteps"
      status="process"
      :active-index="1"
      type="default"
    />
  </PreviewBlock>
  <PreviewBlock title="primary/ghost">
    <div class="bg-black w-full py-16px rounded-8px">
      <DuSteps
        :steps="basicSteps"
        status="process"
        :active-index="3"
        type="ghost"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="success/ghost">
    <div class="bg-black w-full py-16px rounded-8px">
      <DuSteps
        color="success"
        :steps="basicSteps"
        status="process"
        :active-index="3"
        type="ghost"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="warning/ghost">
    <div class="bg-black w-full py-16px rounded-8px">
      <DuSteps
        color="warning"
        :steps="basicSteps"
        status="process"
        :active-index="3"
        type="ghost"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="error/ghost">
    <div class="bg-black w-full py-16px rounded-8px">
      <DuSteps
        color="error"
        :steps="basicSteps"
        status="process"
        :active-index="3"
        type="ghost"
      />
    </div>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { DuSteps } from 'dangoui'

const basicSteps = [
  { title: '等待支付' },
  { title: '等待卖家发货' },
  { title: '已发货' },
  { title: '送货中' },
  { title: '已到货' },
]
</script>
