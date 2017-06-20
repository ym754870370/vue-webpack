## vue-router


![Alt text](./photos/vue-router-luoji.png)



### vue-cli这套全家桶状态下如何去实例化的？
利用vue-router去实例化组件，实现了组件之间互联，如文件夹router中的index文件，直接new一个router的对象，会先配置好path,同时component中的参数会成为vue组件的引用类型，当跳到当前path环境下，当前的components引用的vue组件就会被实例化


vue-router就是一个对象，写在js中，然后路径引到main.js中，作为new vue对象中的router参数的value即可。


### 从第二次加载时就开始调用缓存 keep-alive


### 懒加载
#### 单个组件按需加载
```javascript
//将路由对应的组件定义成异步组件
const Foo = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['./Foo.vue'], () => {
    resolve(require('./Foo.vue'))
  })
}
//同上，利用AMD风格的require
const Foo = resolve => require(['./Foo.vue'], resolve)

//路由配置不需要任何改变
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})

```

#### 组件按组分块加载
把某个路由下的所有组件都打包在同个异步 chunk 中,require.ensure 第三个参数作为 chunk 的名称:
```javascript
const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')

```

### router的一些方法

#### router.push
使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL.
```javascript
//声明式
<router-link :to="...">

//编程式
router.push(...)
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

```

#### router.replace
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
```javascript
//声明式
<router-link :to="..." replace>

//编程式
router.replace(...)

```
#### router.go()
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)

```

### 钩子函数
#### router.beforeEach(to, from, next)
to: 即将要进入的路由
from: 当前导航正要离开的路由
next: 1. next():执行管道中的另一个钩子
      2. next(false): 返回from的路由
      3. next({path: "/"})
         next("/"): 中断当前导航，进入下一个新的导航
#### router.afterEach(router => {})

#### 其它可直接阅读vue-router官方文档
