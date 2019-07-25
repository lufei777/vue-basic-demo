<template>
  <div class="zoom-compare flex">
      <div class="left-zoom-nav">
        <ZoomNavigation :floorList="floorList"/>
      </div>
      <div class="right-content">
        <ConditionSelect :isMultiple="false" :isGroup="false" />
        <div ref="myChart" class="my-chart"></div>
        <DynamicTable :tableData="tableData" :tableTip="tableTip" :curPage="curPage" />
      </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {mapState} from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import ChartUtils from '../../../utils/chartUtils'
  import ZoomNavigation from '../../../components/zoomNavigation/index'
  import ConditionSelect from '../../../components/conditionSelect/index'
  import DynamicTable from '../../../components/dynamicTable/index'
  export default {
    name:'ZoomCompare',
    components: {
      ZoomNavigation,
      ConditionSelect,
      DynamicTable
    },
    data () {
      return {
        floorList:[],
        tableData:{
          total:0
        },
        myChart:'',
        curPage:1,

      }
    },
    computed: {
      ...mapState({
        checkedFloorList: state => state.conditionSelect.checkedFloorList,
        energy: state => state.conditionSelect.energy,
        selectType: state => state.conditionSelect.selectType,
        radioType: state => state.conditionSelect.radioType,
        startTime: state => state.conditionSelect.startTime,
        lastTime: state => state.conditionSelect.lastTime,
      }),
      floorNameList(){
        return this.checkedFloorList.map((item)=>item.name).join('、')
      },
      ids(){
        return this.checkedFloorList.map((item)=>item.id).join(',') //楼层id
      },
      tableTip(){
        return `A3${this.floorNameList}${this.energy[0].name}展示排名`
      },
      commonParams(){
        return {
          ids:this.ids,//楼层id
          catalog:this.energy[0].id,
          selectType:this.selectType,
          redioType:this.radioType,
          startTime:this.startTime,
          lastTime:this.lastTime
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
      },
      async getZoomCompareChart(){
        let res =  await CommonApi.getZoomCompareChart(this.commonParams)
        this.initChart(res)
      },
      async getZoomCompareTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10
          }
        }
        let res = await CommonApi.getZoomCompareTable(tableParams)
        if(res && res.value){
          res.value.map((item)=>{
            if(item[1])
             item[1]=item[1].slice(0,10)
          })
          this.tableData=res
        }else{
          this.tableData={
            total:0
          }
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
         this.tableData=[]
         this.getZoomCompareChart()
         this.getZoomCompareTable()
      },
      initChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`A3${this.floorNameList}${this.energy[0].name}趋势对比`
        let legendData = this.floorNameList.split("、")
        let xAxis= res[0].map((item)=>item.time.slice(0,10))
        let yAxis=res[0][0].unit
        let series=[]
        let tmp
        res.map((item,index)=>{
          tmp = item.map((everyFloor)=>everyFloor.value)
          series.push({
            name:item[index] && item[index].floor,
            type:'bar',
            data:tmp
          })
        })
        let data={
          titleText,
          legendData,
          xAxis,
          yAxis,
          series
        }
        ChartUtils.handleBarChart(this.myChart,data)
      },
      handleCurrentChange(value){
         this.curPage=value
         this.getZoomCompareTable()
      },
      handleNavCanCheck(checkNode){
        if(checkNode.length<4){
          this.floorList[0].nodes.map((item)=>{
             item.disabled=false
          })
        }else{
          this.floorList[0].nodes.map((item)=>{
            item.disabled=true
            checkNode.map((check)=>{
               if(item.floorId==check.floorId){
                  item.disabled=false
               }
            })
          })
          return;
        }
      },
      async handleExport(){
        let url="http://localhost:8080/vibe-web/energyCount/energy/energy_speceExcle?"
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        location.href=url+params
      }
    },
    mounted(){
      this.getAllFloor()
    }
  }
</script>

<style lang="less">
 .zoom-compare {
   width: 100%;
   .my-chart{
     border-radius: 10px;
     border:1px solid #ccc;
     margin-top: 30px;
     background: @white;
     overflow: hidden;
     width: 100%;
     height:450px;
     padding:20px 5px 5px 5px;
   }
 }
</style>
