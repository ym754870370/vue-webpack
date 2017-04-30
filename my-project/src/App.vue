<template>
  <div id="app">
    <router-view name="demo"></router-view>
    <router-view :options="options" name="widget"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      options: [{
        'value': 1,
        'text': '期房'
      },
      {
        'value': 2,
        'text': '现房'
      },
      {
        'value': 3,
        'text': '尾房'
      }]
    }
  }
}
</script>

<style>
#app {
}
</style>
