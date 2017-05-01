// 时间戳转换为正确格式的字符串
exports.dateFormat = function (date, str) {
  console.log('ye')
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {}
  if (new RegExp('(' + k + ')').test(str)) str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return str
}

exports.smallDateFormat = function (date) {
  var month = date.getMonth() + 1
  var day = date.getDate()
  var year = date.getYear() + 1900
  var str = year + '-' + month + '-' + day
  return str
}
