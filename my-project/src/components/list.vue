<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      align="center"
      label="操作时间"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="操作人"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
      label="归属板块">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
      label="楼盘名称">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
      label="省">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
      label="市">
    </el-table-column>
    <el-table-column
      align="center"
      prop="address"
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
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="listIndex"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listDataLength"
      align="right">
    </el-pagination>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      listData: [Array]
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
      console.log(this.listIndex)
      _this.tableData = arr
    },
    methods: {
      handleClick () {
        console.log(1)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.listIndex = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.listCount = val
        console.log(`当前页: ${val}`)
      }
    },
    watch: {
      listIndex: function (newV) {
        var _this = this
        var arr = []
        _this.listData.map(function (v, i) {
          if ((_this.listCount - 1) * _this.listIndex <= i && i < _this.listCount * _this.listIndex) {
            arr.push(v)
          }
        })
        _this.tableData = arr
      },
      listCount: function (newV) {
        var _this = this
        var arr = []
        console.log(newV)
        var n = 0
        _this.listData.map(function (v, i) {
          if ((_this.listCount - 1) * _this.listIndex <= i && i < _this.listCount * _this.listIndex) {
            arr.push(v)
            console.log(n + 1)
          }
        })
        console.log(arr)
        _this.tableData = arr
      },
      listData: function (newV) {
        var _this = this
        var arr = []
        _this.listDataLength = _this.listData.length
        _this.listData.map(function (v, i) {
          if (i < _this.listIndex) {
            arr.push(v)
          }
        })
        _this.tableData = arr
      }
    },
    data () {
      return {
        tableData: [],
        currentPage: 1,
        listIndex: 1,
        listCount: 1,
        listDataLength: 0
      }
    }
  }
</script>
