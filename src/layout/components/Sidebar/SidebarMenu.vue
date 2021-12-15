<template>
  <el-menu
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
    :default-active="activeMenu"
  >
    <sidebar-item :route="item" v-for="item in routes" :key="item.path"></sidebar-item>
  </el-menu>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  console.log('filterRoutes', filterRoutes)
  return generateMenus(filterRoutes)
})
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
console.log(router.getRoutes())
console.log(JSON.stringify(routes.value))
</script>
<style lang="scss" scoped>
</style>
