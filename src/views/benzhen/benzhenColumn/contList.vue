<template>
  <div class="app-container">
    <eHeader @switchbtn="switchbtn" :sup_this="sup_this" :query="query" :headmainStatus="headmainStatus"/>
    <contList ref="contList" :sup_this="sup_this" :contData="contData" :addCont="addCont"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { parseTime } from '@/utils/index'
import eHeader from './module/contheader'
import contList from './content'
export default {
  components: { eHeader,contList},
  props: {
    index_this: {
      type: Object,
      required: true
    },
    contData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      sup_this: this,
      query: {},
      headmainStatus:{
        mainStatus:1
      },
    }
  },
  watch:{
    contData:function(newVal,oldVal){
//      this.contData=newVal
    },
  },
  mounted(){
    const that=this
  },
  methods: {
    parseTime,
    switchbtn(){
      this.index_this.switchbtn({
        component:'indexList'
      })
    },
    //搜索
    searchFormList(){
      this.$refs.contList.searchFormList();
    },
    addCont(){
      this.$refs.contList.addCont();
    },
    cancel(){
      if(this.$refs.contList.mainStatus==2){
        this.$refs.contList.cancel();
      }
    },
  },
}
</script>

<style scoped>

</style>
