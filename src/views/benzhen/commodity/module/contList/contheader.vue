<template>
  <div class="head-container">
    <!-- 返回 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-back"
        @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    index_this: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  },
  methods: {
    toQuery() {
    },
    goBack() {
      const that=this;
      that.sup_this.cancel();
      that.index_this.switchbtn({
        component:'indexList',
        data:{}
      })
    },
  }
}
</script>
