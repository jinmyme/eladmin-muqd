<template>
  <keep-alive>
    <component :is="currentTabComponent" @switchbtn="switchbtn" :index_this="index_this" :contData="contData"></component>
  </keep-alive>
</template>

<script>
import indexList from './indexList'
import contList from './contList'
export default {
  components: {
    'indexList': indexList,
    'contList':contList,
  },
  data() {
    return {
      currentTabComponent:indexList,
      index_this:this,
      contData:{}
    }
  },
  created() {
  },
  mounted: function(){
  },
  methods: {
    switchbtn(data){
      this.currentTabComponent=data.component
      if(data.data) this.contData=data.data
    }
  }
}
</script>

<style scoped>
</style>
