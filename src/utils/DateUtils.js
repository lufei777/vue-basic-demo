/**
 * 日期工具类
 */
class DateUtils {
  constructor () {

  }

  /**
   * 日期格式化
   */
  formatTime (time, format) {
    if (!time) return time
    //	console.log(time)
    let datetime = new Date(time)
    //	console.log(datetime+"aa")
    let year = datetime.getFullYear()
    let month = datetime.getMonth()
    let date = datetime.getDate()
    let hour = datetime.getHours()
    let minute = datetime.getMinutes()

    if (/yyyy/.test(format)) {
      format = format.replace(/yyyy/, year)
    }
    if (/MM/.test(format)) {
      if ((month + 1) < 10) {
        format = format.replace(/MM/, '0' + (month + 1))
      } else {
        format = format.replace(/MM/, (month + 1))
      }
    }
    if (/dd/.test(format)) {
      if (date < 10) {
        format = format.replace(/dd/, '0' + date)
      } else {
        format = format.replace(/dd/, date)
      }
    }
    if (/HH/.test(format)) {
      if (hour < 10) {
        format = format.replace(/HH/, '0' + hour)
      } else {
        format = format.replace(/HH/, hour)
      }
    }
    if (/mm/.test(format)) {
      if (minute < 10) {
        format = format.replace(/mm/, '0' + minute)
      } else {
        format = format.replace(/mm/, minute)
      }
    }
    return format
  }
}

// 导出单例，方便直接使用
export default new DateUtils()
