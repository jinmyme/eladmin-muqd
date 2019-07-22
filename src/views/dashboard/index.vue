<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import { systemLook } from '@/api/visits'

/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
//systemLook().then(res => {})

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
//    ...mapGetters([
//      'roles'
//    ])
  }
}
</script>
