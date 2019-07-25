<template>
  <div class="table-box">
    <div class="flex-align-between">
      <h3 class="table-tip">{{tableTip}}</h3>
      <el-button v-if='tableData.total!=0' type="primary"
                 class="export-btn" @click="handleExport">
        导出表格
      </el-button>
    </div>
    <div v-if="tableData.total!=0">
      <table width="100%" cellpadding="10" class="dynamic-table">
        <thead>
        <th v-for="(item,index) in tableData.title" :key="index">{{item}}</th>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData.value" :key="index">
          <th v-for="(val,i) in item" :key="i">{{val}}</th>
        </tr>
        </tbody>
      </table>
      <div class="page-box">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="curPage"
          layout="total, prev, pager, next, jumper"
          :total="tableData.total">
        </el-pagination>
      </div>
    </div>
    <div v-if="tableData.total==0" class="no-data">暂无数据</div>
  </div>
</template>

<script>
  export default {
    name:'DynamicTable',
    components: {
    },
    props:['tableTip','tableData','curPage'],
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      handleCurrentChange(value){
        this.$parent.handleCurrentChange(value)
      },
      handleExport(){
        this.$parent.handleExport()
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .table-box{
    border-radius: 10px;
    border:1px solid #ccc;
    margin-top: 30px;
    padding:5px;
    background: @white;
    overflow: hidden;
    .table-tip{
      padding-left:10px;
      text-align: left;
      color: #0f0f0f;
      width:70%;
      float: left;
    }
    .dynamic-table{
      border-spacing:0;
      font-size: 14px;
      clear: both;
      th{
        font-weight: normal;
        border-left:0.5px solid @tableBorder;
        border-top:0.5px solid @tableBorder;
        padding:12px 0;
      }
      tr:last-child th{
        border-bottom:0.5px solid @tableBorder;
      }
    }
    .page-box{
      float: right;
      margin:20px;
    }
    .no-data{
      line-height: 60px;
      width: 100%;
      color: #909399;
      text-align: center;
      border:1px solid @tableBorder;
    }
    .export-btn{
      margin-right: 10px;
    }
  }
</style>
