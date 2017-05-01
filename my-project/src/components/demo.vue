<template>
  <div class="demo">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="省份">
        <el-select v-model="formInline.parseInt" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="formInline.city" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼盘名称">
        <el-input v-model="formInline.name" placeholder="情输入楼盘名称"></el-input>
      </el-form-item>
      <el-form-item label="来源" >
        <el-select v-model="formInline.info" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input v-model="formInline.user" placeholder="请输入操作人"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" required>
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
    <list :listData="dateOptions"></list>
  </div>
</template>

 
<script>
  import list from './list'
  import format from '../format.js'
  export default {
    name: 'demo',
    components: {
      list: list
    },
    data () {
      return {
        formInline: {
          user: '',
          parseInt: '',
          city: '',
          name: '',
          info: '',
          date: ''
        },
        listData: [{
          date: '2017-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2017-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2017-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2017-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-09',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-10',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-11',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-12',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-13',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-14',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2017-05-15',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        dateOptions: []
      }
    },
    beforeMount () {
      var _this = this
      _this.dateOptions = _this.listData
    },
    methods: {
      onSubmit () {
        var arr = []
        var _this = this
        if (_this.formInline.date[0]) {
          var minDate = format.smallDateFormat(new Date(Date.parse(_this.formInline.date[0]))).toString()
        }
        if (_this.formInline.date[1]) {
          var maxDate = format.smallDateFormat(new Date(Date.parse(_this.formInline.date[1]))).toString()
        }
        console.log(minDate)
        console.log(maxDate)
        _this.listData.map(function (v, i) {
          if (minDate && maxDate) {
            if (Date.parse(minDate) <= Date.parse(v.date) && Date.parse(maxDate) >= Date.parse(v.date)) {
              arr.push(v)
              console.log('y')
            }
            // console.log('minDate:' + Date.parse(minDate))
            // console.log(Date.parse(v.date))
            // console.log('maxDate: ' + Date.parse(maxDate))
          }
        })
        if (arr.length !== 0) {
          _this.dateOptions = arr
        }
        console.log(arr)
        if (arr.length === 0) {
          _this.dateOptions = _this.listData
        }
      }
    },
    watch () {
      console.log(this.formInline.region)
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
