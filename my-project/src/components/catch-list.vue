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
      prop="operatorName"
      label="操作人"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="moduleName"
      label="归属板块">
    </el-table-column>
    <el-table-column
      align="center"
      prop="projectName"
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
      prop="operation"
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
    props: {
      listDataProp: [Array, Object],
      originList: [Array, Object],
      dataProp: [Object],
      loadingProp: [Boolean, String]
    },
    data () {
      return {
        tableData: [],
        currentPage: 0,
        listIndex: 10,
        listDataLength: 0,
        listData: [],
        loading: true,
        dataScreen: {}
      }
    },
    beforeCreate () {
      var _this = this
      format.getData(0, 10).then(function (res) {
        console.log(res)
        _this.listData = res.data.data.list
        _this.listDataLength = res.data.data.total
      }, function (error) { console.log('出错了', error) })
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
      _this.tableData = arr
    },
    methods: {
      handleClick () {
        console.log('点击了查看')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        var _this = this
        _this.loading = true
        _this.listIndex = val
        format.getScreenList((_this.currentPage - 1), _this.listIndex, _this.dataScreen).then(function (res) {
          _this.listData = res.data.data.list
          _this.listDataLength = res.data.data.total
          // _this.listDataLength = res.data.data.total - _this.listIndex
        }, function (error) { console.log('出错了', error) })
        _this.$emit('handleSizeChange', _this.listIndex)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.loading = true
        var _this = this
        format.getScreenList((_this.currentPage - 1), _this.listIndex, _this.dataScreen).then(function (res) {
          _this.listData = res.data.data.list
          _this.listDataLength = res.data.data.total
          // _this.listDataLength = res.data.data.total - _this.listIndex
        }, function (error) { console.log('出错了', error) })
        _this.$emit('handleCurrentChange', _this.currentPage)
      }
    },
    watch: {
      listData: function (newV) {
        var _this = this
        this.tableData = newV
        if (this.tableData) {
          this.tableData.map(function (v) {
            v.updateTime = format.smallDateFormat(new Date(parseInt(v.operateTime)), 'yyyy-MM-dd')
            _this.originList.forEach(o => {
              if (o.module === v.module) {
                v.moduleName = o.value
              }
            })
          })
        }
        this.loading = false
      },
      listDataProp: function (newV) {
        this.listData = newV.list
        this.listDataLength = newV.total
        // this.listDataLength = newV.total - this.listIndex
      },
      'dataProp.provinceName': function (newV) {
        this.dataScreen.provinceName = newV
      },
      'dataProp.operatorName': function (newV) {
        this.dataScreen.operatorName = newV
      },
      'dataProp.cityName': function (newV) {
        this.dataScreen.cityName = newV
      },
      'dataProp.projectName': function (newV) {
        this.dataScreen.projectName = newV
      },
      'dataProp.origin': function (newV) {
        this.dataScreen.origin = newV
      },
      'dataProp.date': function (newV) {
        this.dataScreen.date = newV
      },
      'dataProp.module': function (newV) {
        this.dataScreen.module = newV
      },
      loadingProp: function (newV) {
        console.log(newV)
        this.loading = newV
      }
    }
  }
</script>
