1：客户端 发送 消息到后台

2：后台返回对应的 消息

3：客户端把后台返回的消息再次发送给服务器 （服务器把消息转成音频文件， 返回音频文件地址）

4： 客户端 把服务器返回的地址 赋值给 audio标签



#### 表单的作用以及常用属性的介绍(了解)

```html
表单时html中的一个标签，称为form，用来收集用户的数据，并且向后台发送数据。
<form method="post" action="http://www.baidu.com">
	<input type="text" name="username"/>
    <input type="password" name="pwd" />
    <input type="date" name="riqi" />
    <input type="submit" value="提交" />
<form>
    
action 表示表单需要提交数据的地址，也就是服务器的url
method 表示当前表单提交数据的方式，默认为get，可以填写get和post两种方式
name   表示当前input框的名字，一般在提交数据的时候，都需要给input添加name属性，否则服务器无法接收参数
submit 添加该属性的按钮再点击的时候会自动触发表单的提交事件
    
在网络传输中，默认只能传输字符串
表单默认传输的数据格式为application/x-www-form-urlencoded类型  // ?name=xh&age=12
传递的如果是二进制数据 图片 视频 音频 使用enctype = multipart/form-data
```



#### jquery怎么绑定表单的提交事件

```html
<form action="/login" id="f1">
    <input type="text" name="user_name" />
    <input type="password" name="password" />
    <button type="submit">提交</button>
 </form>

  <script>
    $(function () {
      // 第二种方式
      $('#f1').on('submit', function (e) { 
        e.preventDefault()
        alert('监听到了表单的提交事件2')
      })
    })
  </script>

我们可以直接获取表单元素，给他们绑定submit事件，当我们点击提交按钮的时候就会自动触发，这里需要注意此时会触发表单的默认提交行为，我们需要在函数中通过  e.preventDefault() 阻止它

tip:需要注意的是，表单的提交按钮只有当type类型是submit时才拥有提交数据的能力
```



#### jquery中快速获取表单数据的方法

```html
serialize是jquery内置的一个快速获取表单元素值的方法，使用的时候只需要获取表单元素本身，然后直接调用serialize方法就可以得到表单中所有input中的数据，注意所有的input或者其他输入框都必须有name属性，否则不能成功获取

<form id="f1" method="post" action="http://www.baidu.com">
	<input type="text" name="username"/>
    <input type="password" name="pwd" />
    <input type="submit" value="提交" />
<form>

<script>
    $('#f1').submit(function (e) {
        e.preventDefault()
        var data = $(this).serialize(); //  username=xh&pwd=123  {username:xh,pwd:123}
        console.log(data)
      }
</script>
```



#### 什么是arttemplate  ( ejs.js )

```js
arttemplate是一款模板引擎，就是插件，他的作用是帮助我们快速的拼接字符串
```



#### arttemplate的基本使用步骤

```html
第一步 ：引入arttemplate
 <script src="./lib/template-web.js"></script>

第二步：创建我们需要的数据
<script>
    var obj = {
       name:"xionghui",
        age:18,
        arr:[1,2,3],
        mobj:{
            name:"xh"
        }
    }
</script>

第三步：创建模板，也就是创建需要拼接的html标签，这里需要使用一个独立的script标签来包裹，还需要为改script指定抓们的type类型，type="text/html"
<script type="text/html" id="tpl">
    <div>
      {{name}}
      {{age}}
      {{arr}}
      {{mobj}}
    </div>
</script>

第四步，调用template函数进行拼接字符串，这个template函数在我们引入了template-web.js以后就自动注入到我们的页面中，可以直接使用,该函数需要传递两个参数
第一个参数：是模板的id号
第二个参数：是需要拼接的数据，该参数必须是对象类型
该函数会根据id号找到模板的位置，把其中的{{}}内部的属性名取出来放到我们的数据里去查找，看看是否拥有对应的属性，有的话就把属性值拿出来，把模板中花括号的位置整个替换成属性值，完成数据的拼接，并自动返回拼接好的字符串
var html = template('tpl',obj);

第五步：把拼接好的字符串渲染到页面上
document.body.innerHTML = html;
```



#### arttemplate的标准语法和原生语法

```js
arttemplate提供标准语法和原生语法来为我们渲染数据，最常用的是标准语法也就是{{}}的形式

template('tpl',{name:"xionghui"})
// 标准语法 只要执行一次，就会在页面生成缓存，后续再次调用非常快
{{name}} 

//原生语法,注意 =和前面的%之间不能有空格 不会生成缓存，多次调用，效率较低
<%= name%>
```



#### arttemplate标准语法的双花括号中可以做哪些操作

```js
标准语法的双花括号里可以对数据进行拼接 ，加减乘除等数学运算，三元运算符处理等常规操作
```



#### arttemplate的if判断和循环

```js
// if判断  必须有if开头，还必须有/if结尾
{{if flag==1}}
我是第一个flag
{{else if flag==2}}
我是第二个flag
{{else}}
 我是第三个flag
{{/if}}
  
  
//循环 必须有each开头和/each结尾，其中$index表示每个元素的索引号，$value表示每个元素
{{each mydata}}
  <div>{{$value}}</div>
{{/each}}
  

{{each obj}}
  	我是对象的属性名{{$index}}
    我是对象的属性值{{$value}}
{{/each}}
```



#### arttemplate定义过滤器

```html
<script type="text/html" id="tpl">
	{{name | upper}}
</script>


<script>
//过滤器是用来对渲染到页面上的数据进行加工处理的方法，有固定的使用方法
//通过在 template.defaults.imports 上添加自定义的方法完成添加过滤器的功能
//注意：过滤器一般定义在template函数调用之前
template.defaults.imports.upper = function(str){
        return str.toUpperCase();
 }
    
var obj = {name:"xh"}    
 
var html = template('tpl',obj)
</script>
```



#### arttemplate过滤器的查找规则

```js
 首先在template.defaults.imports这个对象身上查找，如果有直接执行
 如果没有，就在全局下查找和过滤器名字相同的函数作为过滤器使用，如果该函数也没找到，就报错
```



#### 正则表达式exec方法的基本使用

```js
//exec方法会返回符合我们正则规则的数组	
//注意，这个方法在匹配过程中如果遇到多个字符串被匹配上，默认只会匹配多个中的第一个
var str = "我的名字是{{name}}";
//定义规则
var reg = /{{\s*[a-zA-z]+\s*}}/;
//通过exec返回匹配到的字符串数组
var arr = reg.exec(str);

/*
0: "{{name}}"
groups: undefined
index: 5
input: "我的名字是{{name}}"
length: 1
*/
```



#### 正则表达式exec方法配合分组一起使用

```js
//exec方法会返回符合我们正则规则的数组，其中小括号包起来的规则匹配的内容会显示在下标为1的属性中
var str = "我的名字是{{name}}";
//定义规则，并且添加原字符，就是小括号
var reg = /{{\s*([a-zA-z]+)\s*}}/;
//通过exec返回匹配到的字符串数组
var arr = reg.exec(str);

/*
0: "{{name}}"   //我们要匹配到的内容
1: "name"       //我们用小括号括起来的规则匹配到的内容
groups: undefined
index: 5
input: "我的名字是{{name}}"
*/
```



#### 实现自己的简单模板引擎

```js
//第一个参数是我们要获取的标签的id号
//第二参数是我们要渲染的数据，它是对象类型

function template(oid,data){
        //获取需要处理的字符串
        var str = document.getElementById(oid).innerHTML;
        var data = data;

        //书写正则匹配规则
        var reg = /{{\s*([a-zA-Z]+)\s*}}/;
        while(reg.exec(str) != null){
            var arr = reg.exec(str);
            str = str.replace(arr[0],data[arr[1]])
        }
        //返回最终拼接好的字符串
        return str;
    }
```



#### 原生ajax的基本使用  

```js
我们发送ajax请求依靠的就是浏览器提供的ajax对象完成的，目前最通用的就是XMLHttpRequest对象
XMLHttpRequest是浏览器内置对象，也是构造函数，用来发送和接受ajax数据的（ie9以上都支持该对象）

	//创建ajax对象实例，后续所有的ajax操作都依靠创建出来的ajax实例对象
     var xhr = new XMLHttpRequest();

     //发送数据前的准备工作 配置请求方式和url地址
     xhr.open('post',"http://www.liulongbin.top:3006/api/getbooks");

	// 让客户端告诉服务器当前发送的数据是什么类型 
    // application/x-www-form-urlencoded 表示查询字符串类型  name=xh&age=18
	 xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded")

     //发送数据
     xhr.send("id=1&bookname=西游记");

    // 服务器返回数据的时候自动触发该方法（现在不常用，兼容性较好）
    //  xhr.onreadystatechange = function(){
    //     if (xhr.status === 200 && xhr.readyState == 4) {
    //          //responseText保存的是服务器返回的内容
    //         console.log(xhr.responseText)
    //     }
    //  }

    // 服务器返回数据的时候自动触发该方法（性能更强，但兼容性较差）
    xhr.onload = function(){
        console.log(xhr.responseText)
    }

```

