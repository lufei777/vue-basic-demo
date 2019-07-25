class chartUtils {
  //柱状图处理
  handleBarChart(dom,data){
    let option = {
      title : {text:data.titleText},
      tooltip : {trigger: 'axis'},
      legend: {data:data.legendData},
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data : data.xAxis
        }
      ],
      yAxis : [
        {
          type : 'value',
          name : data.yAxis,
        }
      ],
      series:data.series
    };
    window.onresize = dom.resize;
    dom.setOption(option)
  }
}
export default new chartUtils()
