<template>
  <div class="energy-compare-index flex">
    <div class="left-menu">
      <el-menu default-active="1" class="el-menu-demo"  @select="handleSelect">
        <el-menu-item index="1">空间对比</el-menu-item>
        <el-menu-item index="2">同比环比分析</el-menu-item>
        <el-menu-item index="3">能耗类型对比</el-menu-item>
      </el-menu>
    </div>
    <div class="right-panel flex">
      <keep-alive>
        <component :is="componentType()"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>

  import ZoomCompare from './coms/zoomCompare'
  import TbhbAnalysis from './coms/tbhbAnalysis'
  import TypeCompare from './coms/typeCompare'
  export default {
    components: {
      ZoomCompare,
      TbhbAnalysis,
      TypeCompare
    },
    data () {
      return {
        activeIndex:1
      }
    },
    methods: {
      handleSelect(key){
        this.activeIndex=key
        this.$store.commit("conditionSelect/activeIndex",key)
      },
      componentType(){
         if(this.activeIndex==1){
           return 'ZoomCompare'
         }else if(this.activeIndex==2){
           return 'TbhbAnalysis'
         }else{
           return 'TypeCompare'
         }
      },
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .energy-compare-index{
    .left-menu{
      width:10%;
    }
    .right-panel{
      width: 90%;
      .left-zoom-nav{
        width:15%;
      }
      .right-content{
        width:85%;
        background: #f2f2f2;
        padding:10px;
      }
    }
  }
</style>
