import moment from 'moment'
const state = {
  selectType:'2',
  radioType:0,
  startTime:moment(new Date()).format('YYYY-MM'),
  lastTime:'',
  checkedFloorList:[],
  energy:[{
    id:'',
    name:''
  }],
  tbhbSelectType:'2',
  tbhbRadioType:0,
  tbhbStartTime:moment(new Date()).format('YYYY-MM'),
  tbhbLastTime:'',
  tbhbCheckedFloorList:[],
  tbhbEnergy:[{
    id:'',
    name:''
  }],
  typeSelectType:'2',
  typeRadioType:0,
  typeStartTime:moment(new Date()).format('YYYY-MM'),
  typeLastTime:'',
  typeCheckedFloorList:[],
  typeEnergy:[{
    id:'',
    name:''
  }],
  activeIndex:1,
}

const mutations={
  energy(state,data){
    state.energy=data
  },
  selectType(state,data){
    state.selectType=data
  },
  radioType(state,data){
    state.radioType=data
  },
  startTime(state,data){
    state.startTime=data
  },
  lastTime(state,data){
    state.lastTime=data
  },
  checkedFloorList(state,data){
    state.checkedFloorList=data
  },
  activeIndex(state,data){
    state.activeIndex=data
  },
  tbhbEnergy(state,data){
    state.tbhbEnergy=data
  },
  tbhbSelectType(state,data){
    state.tbhbSelectType=data
  },
  tbhbRadioType(state,data){
    state.tbhbRadioType=data
  },
  tbhbStartTime(state,data){
    state.tbhbStartTime=data
  },
  tbhbLastTime(state,data){
    state.tbhbLastTime=data
  },
  tbhbCheckedFloorList(state,data){
    state.tbhbCheckedFloorList=data
  },
  typeEnergy(state,data){
    state.typeEnergy=data
  },
  typeSelectType(state,data){
    state.typeSelectType=data
  },
  typeRadioType(state,data){
    state.typeRadioType=data
  },
  typeStartTime(state,data){
    state.typeStartTime=data
  },
  typeLastTime(state,data){
    state.typeLastTime=data
  },
  typeCheckedFloorList(state,data){
    state.typeCheckedFloorList=data
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
