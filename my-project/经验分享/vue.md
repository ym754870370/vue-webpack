## vue2.0

#### slot

```javascript

父组件：<div slot="value"></div>

子组件：<slot name="value"><slot>
父组件配置好slot的内容，然后子组件调用插入到自己需要的位置

比如：一些父组件拿到的数据展示在 <div slot="value"></div> 中，然后子组件就可以直接拿去展示
```


#### 虚拟DOM
主要目的：提升页面的刷新速度
原理：

```javascript

js通过如此方式去更新DOM,一个节点还好，但实际情况是一堆节点，这样会大大增加更新时间
document.getElementById('myId').appendChild(myNewNode);


在一个HTML中，DOM节点通常表示如下：

<ul id='myId'>
  <li>Item 1</li>
  <li>Item 2</li>
<ul>

DOM 节点也可以表示 JavaScript 中的对象，像这样：

// Pseudo-code of a DOM node represented as Javascript
Let domNode = {
  tag: 'ul'
  attributes: { id: 'myId' }
  children: [
    // where the LI's would go
  ]
};

这就是我们的"虚拟"DOM


更新虚拟节点的开销不大

// This might be how we update the virtual DOM
domNode.children.push('<ul>Item 3</ul>');


接下来，就是同步的把我们做的改变更新到*真实*DOM 中去，我们使用了一个很有效率的函数：

// This function would call the DOM API and make changes
// to the "real" DOM. It would do it in batches and with
// more efficiency than it would with arbitrary updates.

sync(originalDomNode, domNode);

sync函数：会将所有修改的块放到队列中，然后就直接返回，不等磁盘进行操作，每隔30秒都会周期性调用一次。

```


## vue和react区别比较
1. 更新值原理方面
   二者都是mvvm结构，
   vue 将整套vm结构都进行了黑盒处理，它通过递归对象的属性并使用Object.defineProperty把这是属性转换为转换为get/set(就是将数值属性转换成了访问器属性),进行监听，每一次赋值都会触发 改变当前参数的回调操作 存放到队列中，在update之前进行更新，然后进行自动绑定

###### Object.observe()和Object.defineProperty()：
  ```javascript
   概述：此方法用于异步地监视一个对象的修改。当对象的属性被修改时，方法的回调函数会提供一个有序的修改流，然而这个接口已经从各大浏览器移除，可以使用通用的 proxy 对象。

   数据属性的描述符为：Configurable，Enumerable，Writable，Value；
   访问器属性的描述符为：Configurable， Enumerable，set，get

   defineProperty(x, y, z)
   x: 属性所在的对象
   y: 属性的名字
   z: 描述符对象
   function Vue(obj){
      obj.data.keys().forEach((prop, index) => {
        Object.defineProperty(obj.data, prop, {
          set(){
            //可以在此处进行事件监听
          },
          get(){

          }
        })
      })
      return obj;
   }
   通过defineProperty方法将数据属性转化为访问器属性，因为会对data中的参数进行转化操作，所以vue将不支持再次使用普通的直接赋值 如：vm.name = 'xxx'(这样只是赋值给了一个数值属性，并没有将这个属性转化为可访问属性也就不会具备访问属性的事件监听机制),name则必须在data中进行声明

   ```

   react在vue整套黑盒前 通过设置state, 然后手动调用函数 setState方法 将 newState存入pending队列， 接着调用enqueueUpdate 去进行更新，然后进行自动绑定

   angular

2. 数据流和绑定方面
两个都是单向数据流，全局性数据使用单向，好跟踪，但是vue具备局部区域的双向数据绑定，操作更加的简单。

vue的非ui控件只有单向，只有ui控件才有双向的问题

3. 写法方面
react只支持jsx写法，而vue提供了template方法，更贴近与前端开发

4. 大小和性能方面
vue2.0线上包gzip后只有只有12kb，react需要44kb,而且vue2.0的性能相比较其它框架是较快的。



## Vue 更新数据原理
受到现代JavaScript浏览器的限制，其实主要是 Object.observe() 方法支持的不好。
#### 为什么Object.observe() 方法被废弃？
首先这个方法已经被废弃，因为现在Immutable对象盛行，

#### mutable对象(可变)和Immutable对象(不可变)
Immutable对象是需要通过get()和set()方法进行读写，

如果是原生的 Mutable 对象，在链式访问一个深层级的数据时可能会报对象 undefined 的错误，而 Immutable 对象在碰到这种情况时不会报错，返回的是 undefined。


Mutable 的对象的低效率操作主要体现在复制和比较上，而 Immutable 对象就是解决了这两大低效的痛点。


普通的 Mutable 对象的深拷贝操作会将一整份数据都复制一遍，而 Immutable 对象在修改数据时并不会复制一整份数据，而是将变化的节点与未变化的节点的父子关系转移到一个新节点上，类似于链表的结构。从 “复制” 的角度来看，做到了最小化的复制，未变化的部分都是共享的，Mutable 在复制的时候是 “全量”，而 Immutable 复制的是 “增量”，对于内存空间的使用率的比较高低立判。
并且基于每次修改一个 Immutable 对象都会创建一个新的 Immutable 对象的这种特性可以将数据的修改状态保存成一组快照，这也是挺方便的。
再来说说比较操作。对于 Mutable 的对象，如果要比较两个对象是否相等，必须遍历对象的每个节点进行比较，对于结构复杂的对象来说，其效率肯定高不到哪去。对于 Immutable 对象，immutable.js 提供了直接判断两个 Immutable 对象的「值」是否相等的 API。
```javascript

var map1 = Immutable.Map({a:1, b:1, c:1});
var map2 = Immutable.Map({a:1, b:1, c:1});
assert(map1 !== map2); // 不同的 Immutable 实例，此时比较的是引用地址
assert(Immutable.is(map1, map2)); // map1 和 map2 的值相等，比较的是值
assert(map1.equals(map2)); // 与 Immutable.is 的作用一样

```
在实际的开发应用中，性能并不总是最关键和重要的，对于普通的 JavaScript 的项目来说，由于 Immutable 的特性带来的数据的可控性比起性能来说更有优势，对于 Mutable 对象适合在封闭的作用域小范围使用，而 Immutable 对象适合数据需要跨多个作用域传递时使用。

#### 数组改变
数组直接通过索引去改变数组内某一个值，只算改变了数据值却无法触发任何的回调和监听，vue对数组改变的很多方法都进行了劫持，然后增加了监听，所以使用splice,push等这些方法时，视图层可以动态的改变形成双向绑定
