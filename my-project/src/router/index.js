import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/demo'
import widget from '@/components/widget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        demo: demo,
        widget: widget
      }
    }
  ]
})
