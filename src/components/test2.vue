<template>
  <div class="hello">
    <h1>兄弟组件now count:{{count}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Test2',
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
    }
  }
</script>
