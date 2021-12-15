<template>
  <div class="hamburger-container" @click="toggleClick">
    <span class="hamburger">
      <svg-icon :icon="icon"></svg-icon>
    </span>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>
<style lang="scss" scoped>
.hamburger-container {
	padding: 0 16px;
	display: flex;
	// align-items: center;
	// justify-content: center;
	.hamburger {
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
	}
}
</style>
