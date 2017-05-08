<template>
<div>
  <el-table
    v-loading="loading"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="updateTime"
      align="center"
      label="操作时间"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="creator"
      label="操作人"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="proj_name"
      label="归属板块">
    </el-table-column>
    <el-table-column
      align="center"
      prop="proj_name"
      label="楼盘名称">
    </el-table-column>
    <el-table-column
      align="center"
      prop="provinceName"
      label="省">
    </el-table-column>
    <el-table-column
      align="center"
      prop="cityName"
      label="市">
    </el-table-column>
    <el-table-column
      align="center"
      prop="source"
      label="动作">
    </el-table-column>
    <el-table-column
      align="center"
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="margin-top: 30px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="listIndex"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listDataLength"
      align="right">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import format from '../format.js'
  export default {
    data () {
      return {
        tableData: [],
        currentPage: 0,
        listIndex: 10,
        listDataLength: 0,
        listData: [],
        loading: true
      }
    },
    beforeCreate () {
      var _this = this
      var url = 'http://house-be-manage.focus-test.cn/project/listProject?params=%7B%22page%22:' + 0 + ',%22count%22:' + 10 + '%7D'
      this.$http.get(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        // credentials: 'include',
        withCredentials: true
      })
        .then(function (response) {
          console.log(response.data.data.content)
          _this.listData = response.data.data.content
          _this.listDataLength = response.data.data.totalNum - _this.listIndex
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    beforeMount: function () {
      var _this = this
      _this.listDataLength = _this.listData.length
      var arr = []
      _this.listData.map(function (v, i) {
        if (i < _this.listIndex) {
          arr.push(v)
        }
      })
      console.log(_this.listData)
      console.log(this.listIndex)
      _this.tableData = arr
    },
    methods: {
      handleClick () {
        console.log(1)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        var _this = this
        this.loading = true
        _this.listIndex = val
        console.log(_this.listIndex)
        // var url = 'http://house-be-manage.focus-test.cn/project/listProject?params=%7B%22page%22:' + this.currentPage + ',%22count%22:' + _this.listIndex + '%7D'
        // this.$http.get(url, {
        //   headers: {
        //     'X-Requested-With': 'XMLHttpRequest'
        //   },
        //   // credentials: 'include',
        //   withCredentials: true
        // })
        //   .then(function (response) {
        //     console.log(response.data.data.content)
        //     _this.listData = response.data.data.content
        //     _this.listDataLength = response.data.data.totalNum - _this.listIndex
        //   })
        //   .catch(function (error) {
        //     console.log(error)
        debugger
        var a = format.getData(_this.currentPage, _this.listIndex)
        console.log('a')
        console.log(a)
        _this.listData = format.getData(_this.currentPage, _this.listIndex)[0]
        _this.listDataLength = format.getData(_this.currentPage, _this.listIndex)[1] - _this.listIndex
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        console.log(`当前页: ${val}`)
        var _this = this
        console.log(_this.currentPage)
        var url = 'http://house-be-manage.focus-test.cn/project/listProject?params=%7B%22page%22:' + this.currentPage + ',%22count%22:' + _this.listIndex + '%7D'
        this.$http.get(url, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          // credentials: 'include',
          withCredentials: true
        })
          .then(function (response) {
            _this.listData = response.data.data.content
            _this.listDataLength = response.data.data.totalNum - _this.listIndex
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    watch: {
      listData: function (newV) {
        this.tableData = newV
        this.tableData.map(function (v) {
          v.updateTime = format.smallDateFormat(new Date(parseInt(v.update_time)), 'yyyy-MM-dd')
        })
        this.loading = false
      }
    }
  }
</script>
