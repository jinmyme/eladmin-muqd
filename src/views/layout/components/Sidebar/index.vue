<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="menuLogo-img-cont" :style="{backgroundColor:backgroundColor}">
      <img :src="logoUrl">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :background-color="backgroundColor"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Config from '@/config'

export default {
  data(){
    return{
      logoUrl:Config.imgUrl+'/static/logo.png',
      backgroundColor:'#304156'
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
