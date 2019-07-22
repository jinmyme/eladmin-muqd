<template>
  <keep-alive>
    <component :is="currentTabComponent" @switchbtn="switchbtn" :index_this="index_this" :contData="contData"></component>
  </keep-alive>
</template>

<script>
  import menuList from './menuList'
  export default {
    components: {
      'menuList': menuList,
    },
    data() {
      return {
        currentTabComponent:menuList,
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
