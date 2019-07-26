<template>
  <div class="condition-select flex-align-between">
     <div class="item-group">
        <span>能源：</span>
        <el-select v-if="!isGroup" v-model="curEnergy" placeholder="请选择" @change="handleEnergyChange" >
           <el-option v-for="item in energyList" :key="item.id" :label="item.name" :value="item.id">
           </el-option>
        </el-select>
       <el-select v-if="isGroup" v-model="curEnergy" multiple @change="handleEnergyChange">
         <el-option-group v-for="group in energyList" :key="group.id" :label="group.name" :disabled="group.disabled">
           <el-option
             v-for="item in group.energyType"
             :key="item.id"
             :label="item.name"
             :value="item.id">
           </el-option>
         </el-option-group>
       </el-select>
     </div>
     <div class="item-group">
      <span>时间类型：</span>
      <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
        <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="item-group">
      <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio label="0">单个</el-radio>
        <el-radio label="1">范围</el-radio>
      </el-radio-group>
    </div>
    <div style="flex-shrink: 0" class="flex">
      <div>
        <span>时间：</span>
        <el-date-picker v-model='startTime' :type="dateType"
                        @change="handleStartTimeChange" :clearable="false">
        </el-date-picker>
      </div>
      <div v-show="showLastTime">
        <span class="tag-style">至</span>
        <el-date-picker v-model='lastTime' :type="dateType"
                        @change="handleLastTimeChange" :clearable="false">
        </el-date-picker>
      </div>
    </div>

    <el-button type="primary" class="sure-btn" @click="handleClickSureBtn">确定</el-button>
  </div>
</template>

<script>
  let dateTypeList = [{
    name:'年',
    id:1
  },{
    name:'月',
    id:2
  },{
    name:'日',
    id:3
  }]

  import {mapState} from 'vuex'
  import moment from 'moment'
  import CommonApi from '../../service/api/commonApi'
  export default {
    name:'ConditionSelect',
    components: {
    },
    props:['isMultiple','isGroup'],
    data () {
      return {
        energyList:[],
        dateTypeList,
        curEnergy:[],
        curDateType:'月',
        dateType:'month',
        radio:'0',
        startTime:new Date(new Date().getTime()-30*24*60*60*1000),
        lastTime:new Date(),
        showLastTime:false,
      }
    },
    computed: {
      ...mapState({
        activeIndex:state => state.conditionSelect.activeIndex,
      }),
    },
    watch:{},
    methods: {
      async getEnergyList(){
        let energy
        let res = await CommonApi.getEnergyListByGroup()
        if(this.isGroup){
          res.map((item,index)=>{
            item.disabled=false
            if(index!=0){
              item.disabled=true
            }
          })
          this.energyList = res
          this.curEnergy=[res[0].energyType[0].id,res[0].energyType[1].id]
          energy=[res[0].energyType[0],res[0].energyType[1]]
        }else{
          let tmp=[]
          res.map((item)=>{
            tmp.push(item)
            item.energyType.map((val)=>{
              tmp.push(val)
            })
          })
          this.energyList = tmp
          this.curEnergy=tmp[0].id
            energy=[{
             id:tmp[0].id,
             name:tmp[0].name
           }]
        }
       if(this.activeIndex==1){
         this.$store.commit("conditionSelect/energy",energy)
       }else if(this.activeIndex==2){
         this.$store.commit("conditionSelect/tbhbEnergy",energy)
       }else{
         this.$store.commit("conditionSelect/typeEnergy",energy)
       }

      },
      handleRadioChange(value){
         this.showLastTime = value==1?true:false
         if(this.activeIndex==1){
           this.$store.commit("conditionSelect/radioType",value)
           if(value==0){
             this.timeFormat('lastTime','')
           }else{
             this.timeFormat('lastTime',this.startTime)
           }
         }else if(this.activeIndex==2){
           this.$store.commit("conditionSelect/tbhbRadioType",value)
           if(value==0){
             this.timeFormat('tbhbLastTime','')
           }else{
             this.timeFormat('tbhbLastTime',this.startTime)
           }
         }else{
           this.$store.commit("conditionSelect/typeRadioType",value)
           if(value==0){
             this.timeFormat('typeLastTime','')
           }else{
             this.timeFormat('typeLastTime',this.startTime)
           }
         }
      },
      handleDateTypeChange(value){
        this.dateType=value==1?'year':value==2?"month":'date'
        if(this.activeIndex==1){
          this.$store.commit("conditionSelect/selectType",value)
        }else if(this.activeIndex==2){
          this.$store.commit("conditionSelect/tbhbSelectType",value)
        }else{
          this.$store.commit("conditionSelect/typeSelectType",value)
        }
        this.timeFormat('startTime',this.startTime)
        this.timeFormat('lastTime',this.lastTime)
      },
      handleEnergyChange(value){
        // console.log(value)
        let tmp=[]
        if(this.isGroup){
          this.energyList.map((itemGroup)=>{
            //不同类不可选
             itemGroup.disabled=false
             if(value.length==0) return;
             let tmpArr = itemGroup.energyType.map((item)=> item.id)
             if(tmpArr.indexOf(value[0])==-1){
               itemGroup.disabled=true
             }
             //存入
             itemGroup.energyType.map((item)=>{
               value.map((val)=>{
                  if(item.id==val){
                    tmp.push(item)
                  }
               })
             })
           })
        }else{
           tmp=this.energyList.filter((item)=>item.id==value)
        }
        if(this.activeIndex==1){
          this.$store.commit("conditionSelect/energy",tmp)
        }else if(this.activeIndex==2){
          this.$store.commit("conditionSelect/tbhbEnergy",tmp)
        }else{
          this.$store.commit("conditionSelect/typeEnergy",tmp)
        }
      },
      handleStartTimeChange(value){
         this.timeFormat('startTime',value)
      },
      handleLastTimeChange(value){
        this.timeFormat('lastTime',value)
      },
      timeFormat(time,value){
        let formatType = this.dateType =='year'?'YYYY':this.dateType=='month'?'YYYY-MM':'YYYY-MM-DD'
        if(this.activeIndex==1){
          this.$store.commit(`conditionSelect/${time}`,value?moment(value).format(formatType):'')
        }else if(this.activeIndex==2){
          if(time=='startTime'){
            this.$store.commit(`conditionSelect/tbhbStartTime`,moment(value).format(formatType))
          }else{
            this.$store.commit(`conditionSelect/tbhbLastTime`,value?moment(value).format(formatType):'')
          }
        }else{
          if(time=='startTime'){
            this.$store.commit(`conditionSelect/typeStartTime`,moment(value).format(formatType))
          }else{
            this.$store.commit(`conditionSelect/typeLastTime`,value?moment(value).format(formatType):'')
          }
        }
      },
      handleClickSureBtn(){
        this.$parent.getData && this.$parent.getData()
      },
    },
    mounted(){
      this.getEnergyList()
    }
  }
</script>

<style lang="less">
  .condition-select {
    background: @white;
    padding:25px 15px;
    border:1px solid #ccc;
    border-radius: 10px;
    .item-group{
      flex-shrink: 1;
    }
    .tag-style{
      margin:0 5px;
    }
    .sure-btn{
      margin-left: 10px;
    }
    .el-select{
      width:120px;
    }
    .el-radio{
      margin-right: 20px;
    }
    .el-date-editor.el-input{
      width:150px;
    }

  }
</style>
