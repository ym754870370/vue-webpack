<template>
  <div id="app">
    <router-view name="demo"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate: function () {
    console.log('app beforeCreate')
  },
  created: function () {
    console.log('app Create')
  },
  mounted: function () {
    console.log('app mounted')
  },
  beforeMount: function () {
    console.log('app beforeMount')
  },
  data: function () {
    return {
    }
  }
}
</script>

<style>
#app {
}
</style>
