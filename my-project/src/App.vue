<template>
  <div id="app">
    <router-view name="demo"></router-view>
    <div class="ming">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate: function () {
    console.log('app beforeCreate')
    console.log(this.message === '这是在beforeCreate中的修改')
  },
  mounted: function () {
    console.log('app mounted')
    this.message = '这是在mounted中的修改'
    console.log(this.$el.textContent)
  },
  // mounted: function () {
  //   console.log('app mounted')
  //   this.message = '这是在Mounted中的修改'
  //   console.log(this.message === '这是在mounted中的修改')
  // },
  // beforeMount: function () {
  //   console.log('app beforeMount')
  //   this.message = '这是在beforeMount中的修改'
  //   console.log('beforeMount')
  //   console.log(this.message === '这是在beforeMount中的修改')
  // },
  // methods: function () {
  //   this.message = '这是在method中的修改'
  //   console.log('methods')
  //   console.log(this.message === '这是在methods中的修改')
  // },
  beforeUpdate: function () {
    // this.message = '这是在beforeUpdate中的修改'
    console.log('beforeUpdate')
    console.log(this.$el.textContent)
    this.$nextTick(function () {
      console.log('ming')
      console.log(this.$el.textContent) // => '更新完成'
    })
  },
  updated: function () {
    // this.message = '这是在updated中的修改'
    console.log('updated')
    console.log(this.$el.textContent)
  },
  data: function () {
    return {
      message: '这是初始信息！'
    }
  }
}
</script>

<style>
#app {
}
</style>
