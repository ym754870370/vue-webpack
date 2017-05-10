var format = {}

// 时间戳转换为正确格式的字符串
format.dateFormat = function (date, str) {
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

// 时间戳转换为正确格式的字符串
format.smallDateFormat = function (date) {
  var month = date.getMonth() + 1
  var day = date.getDate()
  var year = date.getYear() + 1900
  var str = year + '-' + month + '-' + day
  return str
}

import axios from 'axios'

// 请求数据
format.getData = function (currentPage, listIndex) {
  var promise = new Promise(function (resolve, reject) {
    var url = 'http://house-be-manage.focus-test.cn/project/listProject?params=%7B%22page%22:' + currentPage + ',%22count%22:' + listIndex + '%7D'
    var res = []
    axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
      .then(function (response) {
        res = [response.data.data.content, response.data.data.totalNum]
        resolve(res) // then中更改了的res，但是存在异步导致拿到数据之前res已经被return
      })
      .catch(function (error) {
        console.log(error)
        reject(error)
        res.error = error
      })
  })
  return promise
}

export default format

