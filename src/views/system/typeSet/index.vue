<template>
  <keep-alive>
    <component :is="currentTabComponent" @switchbtn="switchbtn" :index_this="index_this" :formsetupid="formSetupId"></component>
  </keep-alive>
</template>

<script>
import formSetDetails from './formSetDetails'
import typeList from './typeList'
export default {
  components: {
    'typeList': typeList,
    'formSetDetails': formSetDetails,
  },
  data() {
    return {
      currentTabComponent:typeList,
      index_this:this,
      formSetupId:''
    }
  },
  created() {
  },
  mounted: function() {
  },
  methods: {
    switchbtn(data){
      this.currentTabComponent=data.component
      this.formSetupId=data.formSetupId
    }
  }
}
</script>

<style scoped>
</style>
