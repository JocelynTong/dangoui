
<template>
  <PreviewBlock title="主色调">
    <div class="flex-auto">
      <DuNoticeBar
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="secondary">
    <div class="flex-auto">
      <DuNoticeBar
        color="secondary"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="默认">
    <div class="flex-auto">
      <DuNoticeBar
        color="default"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="成功">
    <div class="flex-auto">
      <DuNoticeBar
        color="success"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="警告">
    <div class="flex-auto">
      <DuNoticeBar
        color="warning"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="失败">
    <div class="flex-auto">
      <DuNoticeBar
        color="error"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="white">
    <div class="flex-auto flex flex-wrap gap-x-8px gap-y-16px bg-black p-8px rounded-8px">
      <DuNoticeBar
        color="white"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="主色调/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="secondary/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        color="secondary"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="默认/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        color="default"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="成功/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        color="success"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="警告/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        color="warning"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="失败/primary">
    <div class="flex-auto">
      <DuNoticeBar
        type="primary"
        color="error"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
  <PreviewBlock title="white/primary">
    <div class="flex-auto flex flex-wrap gap-x-8px gap-y-16px bg-black p-8px rounded-8px">
      <DuNoticeBar
        type="primary"
        color="white"
        text="购买后暂存商家寄存柜，可累计发货省运费"
        link-text="如何发货"
        link-icon="question-circle-filled"
      />
    </div>
  </PreviewBlock>
</template>

<script setup lang="ts">
import { DuNoticeBar } from 'dangoui'
</script>
