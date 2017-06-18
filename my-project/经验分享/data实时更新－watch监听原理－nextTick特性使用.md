
## 一、Data更新&&watch实时更新原理
js对象传递给vue实例作为data后，vue会遍历data中的所有属性，并使用Object.defineProperty方法将这些属性全部转化为getter/setter.

getter/setter 是被封装到vue的data的内部，在内部让vue追踪依赖，在属性被访问或修改时通知变化

每个组件都有对应的watch实例对象， watch是利用在属性渲染时，将属性记为依赖（就是每一个watch会在监听的属性中的set方法栈中加一个回调），在属性set方法调用时，执行watch回调，对参数重新计算，让关联的组件进行更新

![Alt text](http://cn.vuejs.org/images/data.png)

### 不可被监听到的数据变化操作

#### 1.只能检测到对象中属性值的变化，并不能检测到对象属性的添加和删除操作

```javascript
Vue.set(vm.someObject, 'key', value)

Vue.$set(this.someObject, 'key', value)

//代替Object.assign(this.someObject, { a: 1, b: 2 })
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })

```

#### 2.数组中的直接通过索引更改值也不可以被检测到


```javascript
// 以下方法操作数组可以被检测到
push()
pop()
shift()
unshift()
splice()
sort()
reverse()

//直接更改索引不可被检测
vm.items[indexOfItem] = newValue // 值会被修改，但data并不会实时更新。
//替代方法
1. Vue.set(example1.items, indexOfItem, newValue)

2. example1.items.splice(indexOfItem, 1, newValue)

// 修改数组长度时也不可被检测
vm.items.length = newLength // 无效
// 替代方法
example1.items.splice(newLength)

```

### data中的参数需要被提前声明，不然template中调用会报警告

### Vue异步执行DOM更新。
当检测到数据变化，vue会开启一个队列，缓冲在同一事件循环中的所有数据改变，如果watch被触发多次，这种缓冲会去除重复数据操作，vue在内部尝试对这个队列使用原生的Promise.then和MutationObserver，如果执行环境不支持会使用setTimeout(fn, 0)代替。

### 利用Vue.nextTick(callback)，可以在dom已经更新后进行执行，它对应的事件就会安排一个回调函数在dom更新完成后进行执行。

```javascript
//外部声明使用
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})




//组件内部使用nextTick
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
      })
    }
  }
})

```
