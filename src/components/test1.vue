<template>
  <div class="hello">
    <h1>兄弟组件origin count:{{count}}</h1>
    <el-button icon="el-icon-plus" @click="onClickAddBtn"></el-button>
    <!--<a-button type="primary">ant-design-vue效果（没有事件）</a-button>-->
  </div>
</template>

<script>
  export default {
    name: 'Test1',
    data () {
      return {
      }
    },
    computed:{
      count(){
        return this.$store.state.test.count
      }
    },
    methods:{
      onClickAddBtn(){
        let tmp=this.count;
        tmp++
        this.$store.commit('test/count',tmp)
      }
    }
  }
</script>
