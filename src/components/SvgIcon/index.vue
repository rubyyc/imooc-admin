<template>
  <!-- 展示外部图标 -->
  <div class></div>
  <!-- 展示内部图标 -->
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断当前图标是否为外部图标
 */
</script>
<style lang="scss" scoped>
</style>
