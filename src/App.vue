<template>
  <div id="app">
    <!--<img src="../static/image/logo.png">-->

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import url('./less/index.less');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #606266;
}
</style>
