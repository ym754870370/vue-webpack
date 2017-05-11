<template>
  <div class="demo">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="省份">
        <el-select v-model="formInline.provinceName" placeholder="请选择">
          <el-option v-for="(item, index) in provinceList" :label="item.provinceShortName" :value="item.provinceName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="formInline.cityName" placeholder="请选择">
          <el-option v-for="(item, index) in cityList" :label="item.cityShortName" :value="item.cityName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼盘名称">
        <el-input v-model="formInline.projectName" placeholder="情输入楼盘名称"></el-input>
      </el-form-item>
      <el-form-item label="来源" >
        <el-select v-model="formInline.origin" placeholder="请选择">
          <el-option v-for="(item, index) in originList" :label="item.value" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="formInline.operatorName" placeholder="请输入操作人"></el-input>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="daterange" placeholder="选择日期范围" v-model="formInline.date" style="width: 250px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <demoForm></demoForm> -->
    <!-- <list></list> -->
    <catchList :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange" :listDataProp="listDataProp" :dataProp="formInline" :originList="originList" :loadingProp="loading"></catchList>
  </div>
</template>

 
<script>
  import list from './list'
  import catchList from './catchList'
  import format from '../format.js'
  import demoForm from './demo-form'
  export default {
    name: 'demo',
    components: {
      list: list,
      catchList: catchList,
      demoForm: demoForm
    },
    data () {
      return {
        formInline: {
          operatorName: '',
          provinceName: '',
          cityName: '',
          projectName: '',
          origin: '',
          date: '',
          module: '',
          moduleName: ''
        },
        page: 0,
        pageSize: 10,
        listDataProp: [],
        provinceList: [],
        cityList: [],
        loading: false,
        originList: [
          {
            value: '全部',
            module: -1
          },
          {
            value: '楼盘管理',
            module: 0
          },
          {
            value: 'spider数据校对',
            module: 1
          },
          {
            value: '新建楼盘审核',
            module: 2
          },
          {
            value: '楼盘信息审核',
            module: 3
          },
          {
            value: 'spider楼盘更新监控',
            module: 4
          },
          {
            value: '楼盘点评审核',
            module: 5
          },
          {
            value: '点评审核记录',
            module: 6
          }
        ]
        // listData: [],
        // listData: [{
        //   date: '2017-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2017-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2017-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2017-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-05',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-06',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-07',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-07',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-09',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-10',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-11',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-12',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-13',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-14',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }, {
        //   date: '2017-05-15',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }],
        // dateOptions: []
      }
    },
    beforeCreate () {
      var _this = this
      // this.$http.get('http://house-be-manage.focus-test.cn/project/listProject?params=%7B%22page%22:0,%22count%22:10%7D', {
      //   headers: {
      //     'X-Requested-With': 'XMLHttpRequest'
      //   },
      //   // credentials: 'include',
      //   withCredentials: true
      // })
      //   .then(function (response) {
      //     // console.log(response)
      //     // console.log(response.data)
      //     // console.log(response.data.data.content)
      //     _this.listData = response.data.data.content
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      format.getProvince().then(function (res) {
        _this.provinceList = res.data.data
        _this.provinceList.unshift({
          'provinceName': '全部'
        })
      }, function (error) {
        console.log(error)
      })
    },
    beforeMount () {
      var _this = this
      setTimeout(function () {
        _this.dateOptions = _this.listData
      }, 3000)
    },
    methods: {
      onSubmit () {
        var _this = this
        _this.loading = true
        _this.originList.forEach(v => {
          if (v.value === _this.formInline.origin) {
            _this.formInline.module = v.module
          }
        })
        format.getScreenList((_this.page - 1), _this.pageSize, _this.formInline).then(function (res) {
          console.log(res)
          _this.listDataProp = res.data.data
        }, function (error) {
          console.log(error)
        })

        // 虚拟数据时间遍历筛选
        // if (_this.formInline.date[0]) {
        //   var minDate = format.smallDateFormat(new Date(Date.parse(_this.formInline.date[0]))).toString()
        // }
        // if (_this.formInline.date[1]) {
        //   var maxDate = format.smallDateFormat(new Date(Date.parse(_this.formInline.date[1]))).toString()
        // }
        // console.log(minDate)
        // console.log(maxDate)
        // _this.listData.map(function (v, i) {
        //   if (minDate && maxDate) {
        //     if (Date.parse(minDate) <= Date.parse(v.date) && Date.parse(maxDate) >= Date.parse(v.date)) {
        //       arr.push(v)
        //       console.log('y')
        //     }
        //     // console.log('minDate:' + Date.parse(minDate))
        //     // console.log(Date.parse(v.date))
        //     // console.log('maxDate: ' + Date.parse(maxDate))
        //   }
        // })
        // if (arr.length !== 0) {
        //   _this.dateOptions = arr
        // }
        // console.log(arr)
        // if (arr.length === 0) {
        //   _this.dateOptions = _this.listData
        // }
      },
      handleSizeChange: function (info) {
        var _this = this
        _this.page = info
      },
      handleCurrentChange: function (info) {
        var _this = this
        _this.pageSize = info
      }
    },
    watch: {
      'formInline.provinceName': function (newV) {
        var _this = this
        _this.cityList.unshift({
          'cityName': '全部'
        })
        _this.formInline.cityName = ''
        _this.provinceList.forEach(v => {
          console.log(v.provinceShortName)
          if (v.provinceShortName === _this.formInline.provinceName) {
            format.getCity(v.provinceId).then(function (res) {
              _this.cityList = res.data.data
              _this.cityList.unshift({
                'cityName': '全部'
              })
            }, function (error) {
              console.log(error)
            })
          }
        })
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo{
    margin: 20px 20px 0px 20px;
  }
  .demo-form-inline{
  }
</style>
