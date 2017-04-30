<template>
  <div v-bind:class="['selecter', {active: status}]" @click="toggle">
    <span class="input">{{ curText }}</span>
    <ul class="select-options">
      <li class="select-option" v-show="options.length == 0"></li>
      <li v-for="(item, index) of options" @click="changeSelect(index, item)" class="select-option">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .selecter {
    position: relative;
    height: 38px;
    border: 1px #D5D5D5 solid;
    cursor: pointer;
    display: inline-block;
    width: 248px;
    font-size: 14px;
    vertical-align: top;
    background: #fff;
  }
  .selecter:after{
    content: '';
    display: block;
    position: absolute;
    right:0;
    width:17px;
    height:38px;
    border-left: 1px solid #D5D5D5;
    background:#eee url('./images/arrow-down.png') no-repeat center center;
  }
  .selecter.active:after {
    background-image: url('./images/arrow-up.png');
  }

  .selecter .input {
    text-indent: 12px;
    height: 38px;
    width: 80%;
    cursor: pointer;
    position: absolute;
    line-height: 38px;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .selecter .select-options {
    position: absolute;
    top: 38px;
    left: -1px;
    width: 100%;
    border: 1px #ddd solid;
    display: none;
    max-height: 202px;
    overflow: auto;
    zoom: 1;
    z-index: 1000;
  }

  .selecter.active .select-options {
    display: block;
    background-color: #fff;
  }

  .selecter .select-option {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    text-indent: 12px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .selecter .select-option:hover {
    background-color: #f6f6f6;
  }
</style>
<script>
  export default {
    name: 'widget',
    props: {
      value: [Number, String, Boolean],
      disabled: [Boolean],
      options: [Array]
    },
    data: function () {
      return {
        status: false,
        curText: '-请选择-'
      }
    },
    mounted: function () {
      var _this = this
      window.document.addEventListener('click', function () {
        _this.status = false
      })
    },
    methods: {
      toggle: function (e) {
        var _this = this
        if (_this.status === false) {
          window.setTimeout(function () {
            _this.status = true
          }, 0)
        }
      },
      changeSelect: function (index, item) {
        if (this.disabled === true) {
          return
        }
        var _this = this
        this.$emit('input', item.value)
        _this.$emit('change-select', item)
      }
    },
    watch: {
      value: function (val) {
        if (val === -1) {
          return
        }
        var _this = this
        var match
        this.options.forEach(function (item) {
          if (item.value === val) {
            match = item
          }
        })
        if (match) {
          _this.curText = match.text
        } else {
          _this.$emit('input', -1)
          _this.curText = '-请选择-'
        }
      },
      options: function (options) {
        var _this = this
        var match
        options.forEach(function (item) {
          if (item.value === _this.value) {
            match = item
          }
        })
        if (!match) {
          _this.$emit('input', -1)
          _this.curText = '-请选择-'
        }
      }
    }
  }
</script>
