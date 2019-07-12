<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="test-less">
       <span>test-less</span>
    </div>
    <Test1/>
    <Test2 />
  </div>
</template>

<script>
  import Test1 from '../../components/test1'
  import Test2 from '../../components/test2'
  import TestApi from '../../service/api/test'

  export default {
    name: 'HelloWorld',
    components: {
      Test1,
      Test2
    },
    data () {
      return {
        msg: 'Welcome to my basic vue demo'
      }
    },
    methods: {
      async testApi() {
        let res = await TestApi.testApi({
          kind: 1,
          id: 613
        })
        Cookies.set('testCookie', 1)
      },
    },
    mounted(){
       this.testApi()
       console.log($('div').length)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import './test.less';
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
