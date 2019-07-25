import {get, post, url} from '../axios/ApiDecorator'

class CommonApi {

  //能源列表
  @url("/vibe-web/energy/energy_Type")
  @get
  getEnergyList() {}

  //a3所有楼层
  @url('/vibe-web/energyCount/energy/energy_A3floor')
  @get
  getAllFloorOfA3(){}

  //空间对比 图
  @url('/vibe-web/energyCount/energy/energy_speceTu')
  @get
  getZoomCompareChart(){}

  //空间对比 表格
  @url('/vibe-web/energyCount/energy/energy_speceBiao')
  @get
  getZoomCompareTable(){}

  //同比环比 图
  @url('/vibe-web/energyCount/energy/energy_comseqTu')
  @get
  getTbhbChart(){}

  //同比环比 表格
  @url('/vibe-web/energyCount/energy/energy_comseqBiao')
  @get
  getTbhbTable(){}

  //分组能源
  @url('/vibe-web/energy/energy_getType')
  @get
  getEnergyListByGroup(){}

  //能耗类型对比 图
  @url('/vibe-web/energyCount/energy/energy_typeTu')
  @get
  getTypeChart(){}

  //能耗类型对比 表格
  @url('/vibe-web/energyCount/energy/energy_typeBiao')
  @get
  getTypeTable(){}

}

export default new CommonApi()
