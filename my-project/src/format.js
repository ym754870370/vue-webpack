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
// 请求列表数据
format.getData = function (currentPage, listIndex) {
  var promise = new Promise(function (resolve, reject) {
    var url = 'http://house-be-manage.focus-test.cn/record/list?page=' + currentPage + '&pageSize=' + listIndex
    axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
      .then(function (response) {
        resolve(response) // then中更改了的res，但是存在异步导致拿到数据之前res已经被return
      })
      .catch(function (error) {
        console.log(error)
        reject(error)
      })
  })
  return promise
}

// 请求省份数据
format.getProvince = function () {
  var promise = new Promise(function (resolve, reject) {
    var url = 'http://house-sv-base.focus-test.cn/city/province?status=1'
    axios.get(url)
      .then(function (res) {
        resolve(res)
      })
      .catch(function (error) {
        reject(error)
      })
  })
  return promise
}

// 请求城市数据
format.getCity = function (provinceId) {
  var promise = new Promise(function (resolve, reject) {
    var url = 'http://house-sv-base.focus-test.cn/city/list?provinceId=' + provinceId
    axios.get(url)
      .then(function (res) {
        resolve(res)
      })
      .catch(function (error) {
        reject(error)
      })
  })
  return promise
}

// 请求具体查询信息的数据
format.getScreenList = function (currentPage, listIndex, data) {
  var promise = new Promise(function (resolve, reject) {
    var url = 'http://house-be-manage.focus-test.cn/record/list?' +
      ((data.cityName !== '全部') ? (data.cityName ? ('&cityName=' + data.cityName) : '') : '') +
      ((data.provinceName !== '全部') ? (data.provinceName ? ('&provinceName=' + data.provinceName) : '') : '') +
      '&page=' + currentPage +
      '&pageSize=' + listIndex +
      ((data.module !== -1) ? (data.module ? ('&module=' + data.module) : '') : '') +
      (data.operatorName ? ('&operatorName=' + data.operatorName) : '') +
      (data.projectName ? ('&projectName=' + data.projectName) : '') +
      (data.date ? (data.date[0] ? ('&startTime=' + Date.parse(data.date[0])) : '') : '') +
      (data.date ? (data.date[1] ? ('&endTime=' + Date.parse(data.date[1])) : '') : '')
    axios.get(url, {
      withCredentials: true
    })
      .then(function (res) {
        resolve(res)
      })
      .catch(function (error) {
        reject(error)
      })
  })
  return promise
}

export default format

