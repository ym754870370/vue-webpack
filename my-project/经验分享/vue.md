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
   vue 将整套vm结构都进行了黑盒处理，它通过对对象值的 get 和 set 方法设置监听，每一次赋值都会触发 改变当前参数的回调操作 存放到队列中，在update之前进行更新，然后进行自动绑定

   react在vue整套黑盒前 通过设置state, 然后手动调用函数 setState方法 将 newState存入pending队列， 接着调用enqueueUpdate 去进行更新，然后进行自动绑定

2. 数据流和绑定方面
两个都是单向数据流，全局性数据使用单向，好跟踪，但是vue具备局部区域的双向数据绑定，操作更加的简单。

vue的非ui控件只有单向，只有ui控件才有双向的问题

3. 写法方面
react只支持jsx写法，而vue提供了template方法，更贴近与前端开发

4. 大小和性能方面
vue2.0线上包gzip后只有只有12kb，react需要44kb,而且vue2.0的性能相比较其它框架是较快的。
