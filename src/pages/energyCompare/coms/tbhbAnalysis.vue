<template>
  <div class="tbhb-analysis flex">
    <div class="left-zoom-nav">
      <ZoomNavigation :floorList="floorList" :defaultChecked="defaultChecked" />
    </div>
    <div class="right-content">
      <ConditionSelect :isMultiple="false" :isGroup="false"/>
      <div ref="myChart" class="my-chart"></div>
      <div class="table-box">
        <div class="flex-align-between">
          <h3 class="table-tip">A3{{energy[0].name}}明细展示排名</h3>
          <el-button v-if='tableData.total!=0' type="primary"
                     class="export-btn" @click="handleExport">
            导出表格
          </el-button>
        </div>
        <el-table :data="tableData.value"  border @header-click="sortTable">
          <el-table-column prop="xulie" label="排名"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="dqzh" label="当期综合能耗（kwh）"></el-table-column>
          <el-table-column prop="tqzh" label="同期综合能耗（kwh）" ></el-table-column>
          <el-table-column prop="sqzh" label="上期综合能耗（kwh）" ></el-table-column>
          <el-table-column prop="tbzz" label="综合能耗同比增长率（%）">
            <template slot-scope="scope">
              <span>{{scope.row.tbzz}}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="hbzz" label="综合能耗环比增长率（%）">
            <template slot-scope="scope">
              <span>{{scope.row.hbzz}}%</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box" v-if="tableData.total!=0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="curPage"
          layout="total, prev, pager, next, jumper"
          :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import {mapState} from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import ZoomNavigation from '../../../components/zoomNavigation/index'
  import ConditionSelect from '../../../components/conditionSelect/index'
  export default {
    name:'TbhbAnalysis',
    components: {
      ZoomNavigation,
      ConditionSelect
    },
    data () {
      return {
        floorList:[],
        curPage:1,
        rankType:'dqzh',
        myChart:'',
        tableData:{
          total:0
        },
        defaultChecked:[]
      }
    },
    computed: {
      ...mapState({
        checkedFloorList: state => state.conditionSelect.tbhbCheckedFloorList,
        energy: state => state.conditionSelect.tbhbEnergy,
        selectType: state => state.conditionSelect.tbhbSelectType,
        radioType: state => state.conditionSelect.tbhbRadioType,
        startTime: state => state.conditionSelect.tbhbStartTime,
        lastTime: state => state.conditionSelect.tbhbLastTime,
      }),
      floorNameList() {
        return this.checkedFloorList.map((item) => item.name).join('、')
      },
      commonParams() {
        return {
          floorId: this.checkedFloorList[0].id,
          catalog: this.energy[0].id,
          selectType: this.selectType,
          redioType: this.radioType,
          startTime: this.startTime,
          lastTime: this.lastTime
        }
      }
    },
    methods: {
      async getAllFloor(){
        let res  = await CommonApi.getAllFloorOfA3()
        let tmp=[res[0]]
        tmp[0].disabled=true
        res.shift()
        res.map((item)=>{
          item.disabled=false
        })
        tmp[0].nodes=res
        this.floorList = tmp
        this.defaultChecked =[{id:res[0].floorId,name:res[0].floor}]
      },
      handleNavCanCheck(checkNode){
        if(checkNode.length<1){
          this.floorList[0].nodes.map((item)=>{
            item.disabled=false
          })
        }else{
          this.floorList[0].nodes.map((item)=>{
            item.disabled=true
            checkNode.map((check)=>{
              if(item.floorId==(check.floorId || check.id)){
                item.disabled=false
              }
            })
          })
          return;
        }
      },
      getData(){
        if(this.checkedFloorList.length==0){
          this.$message({
            message: '请先选择楼层',
            type: 'warning',
            duration:800,
            center:true
          });
          return;
        }
        this.getTbhbChart()
        this.getTbhbTable()
      },
      async getTbhbChart(){
        let res = await CommonApi.getTbhbChart(this.commonParams)
        this.initChart(res)
      },
      async getTbhbTable(){
        let tableParams = {...this.commonParams,...{
            rankType:this.rankType,
            page:this.curPage,
            size:10,
          }
        }
        this.tableData= await CommonApi.getTbhbTable(tableParams)
      },
      initChart(res) {
        this.myChart = echarts.init(this.$refs.myChart);
        let xAxis
        if(this.selectType==3 && this.radioType==0){
          xAxis = res.value.map((item)=>item.date.slice(0,16))
        }else{
          xAxis = res.value.map((item)=>item.date.slice(0,10))
        }
        let dqzh={
          name:'当期综合能耗',
          type:'bar',
          data:res.value.map((item)=>item.dqzh)
        }
        let tqzh={
          name:'同期综合能耗',
          type:'bar',
          data:res.value.map((item)=>item.tqzh)
        }
        let tbzz={
          name:'综合能耗同比增长率',
          type:'line',
          data:res.value.map((item)=>item.tbzz)
        }
        let data=res.value.map((item)=>item.hbzz)
        let hbzz={
          name:'综合能耗环比增长率',
          type:'line',
          data
        }
        let series=[dqzh,tqzh,tbzz,hbzz]
        let option = {
          title : {text:`A3${this.energy[0].name}同比环比柱状折线图`},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data:['当期综合能耗','同期综合能耗','综合能耗同比增长率','综合能耗环比增长率']
          },
          xAxis: [
            {
              type: 'category',
              data:xAxis,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: res.unit,
            },
          ],
          series
        };
        this.myChart.setOption(option)
      },
      handleCurrentChange(value){
        this.curPage=value
        this.getTbhbTable()
      },
      sortTable(column){
         this.rankType=column.property
         this.getTbhbTable()
      },
      async handleExport(){
        let url="http://localhost:8080/vibe-web/energyCount/energy/energy_comseqExcel?"
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        params+='rankType='+this.rankType
        location.href=url+params
      }
    },
    async mounted(){
       await this.getAllFloor()
       this.handleNavCanCheck(this.defaultChecked)
       this.getData()
    }
  }
</script>

<style lang="less">
  .tbhb-analysis{
    width:100%;
    .table-box,.my-chart{
      border-radius: 10px;
      border:1px solid #ccc;
      margin-top: 30px;
      padding:5px;
      background: @white;
      overflow: hidden;
    }
    .my-chart{
      width: 100%;
      height:450px;
      padding-top:20px;
    }
    .page-box{
      float: right;
      margin:20px;
    }
    .export-btn{
      margin-right: 10px;
    }
    .el-table thead th:hover{
      cursor: pointer;
    }
  }
</style>
