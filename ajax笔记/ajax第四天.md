xhr.upload.onprogress   //  e.loaded     e.total

xhr.upload.onload



axios({

url:"",

method:'get',

params:{

name:xh

}

}).then(function(msg){

});

-------------------------------------

axios({

url:"",

method:'post',

data:{

name:xh

}

}).then(function(msg){

});



同源策略 -》 浏览器 安全机制





1： jsonp  get  (不支持路由模式)

2：cors (上线以后和开发中都常用)

3：代理技术（开发过程中）





1： 定义函数 接受服务器返回的数据

2：写一个script  src=''远程地址'

3：把本地的函数名出啊你的给后台

4：abc({name:'xh'})





#### 同源的概念

```js

发送请求的客户端，他的域名 端口 协议 和 服务器的域名 端口 协议，只要有一个不同的，则认为客户端和服务器不是同源，那么服务器会禁止浏览器展示他返回给浏览器的数据,只能三者统一，才可以互相传输数据

http://www.baidu.com:3000   // 其中 http表示协议  www.baidu.com表示域名 3000表示端口号

如果发送请求的文件的域名 端口 协议 是以下几种，都不能正常拿到服务器返回的数据
https://www.baidu.com/html:3000  // 协议不同

http://www.baidu2.com/html:3000  // 域名不同

http://www.baidu.com:80  // 端口不同

https://www.baidu2.com:80  // 协议 端口 域名都不同

我们平时做测试使用的文件一般都是本地文件，本地文件大多是文件协议 ，没有端口，因此直接访问访问服务器也是不行的，他们也不是同源：
file:///D:/mytest/index.html // 协议是file:///D，表示文件协议

tip:跨域访问的时候。请求可以正常的发送，服务端可以根据请求返回对应的数据，但是数据回到浏览器以后，会被浏览器的同源策略做校验，如果发现请的电脑的域名 端口 协议和服务器的域名 端口 协议有一个或者多个不同，那么就不允许用户使用返回的数据。

出现以下报错，就是跨域：
Access to XMLHttpRequest at 'http://www.liulongbin.top:3006/api/jsonp?name=zs&age=20' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

```



#### 解决跨域的问题的方案

```js
jsonp    //前端解决方案,缺点是只能发送get请求

前端配置前端独立服务器进行转发请求   //前端解决方案

cors 后端设置允许请求通过  //后端解决方案
```



#### jsonp运行流程

```js
1:在页面中准备一个script标签或者动态创建一个script标签

2：给script标签的src属性赋值上一个远程服务器的地址，并且传递本地页面已经定义好的函数名称

3：当代码解析到scrpt标签时候，会发送那个请求到服务器，并且把函数名称发送给服务器，服务器更具请求找到对应的数据，然后返回一个函数调用，并且把数据作为参数放到函数的参数中，这个函数就是前端发送过来的函数。

4：当后端的函数调用返回到前段以后，就会直接执行前端已经写好的本地函数，并且可以从该函数中得到服务器返回的数据。
```



#### 手动实现简单的jsonp

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="button"  value="发送">
</body>

<script> 
    
function abc(msg){
    console.log(msg)
}
// abc({'name':123})

document.querySelector('input').onclick=function(){
    //创建script标签
    var s = document.createElement('script');
    //设置src属性，指向远程服务器
    s.src = 'http://www.liulongbin.top:3006/api/jsonp?callback=abc&name=ls&age=30';
    //把标签插入到body中
    document.body.appendChild(s);
    //等待js资源载入完成自动执行
    s.onload = function(){
        //删除当前的script标签
        s.parentNode.removeChild(this);
    }
}
    
 /*
 	   function jsonp(webname, fn) {
        var script = document.createElement('script');
        script.src = webname + "?callback=" + fn;
        document.body.appendChild(script);
        script.onload = function() {
            this.remove();
        }
    }
 */
</script>
</html>
```



#### 防抖

```js
通俗的定义：
当我们接到通知去做一件事情的时候，延迟一会去做，并且当我们做这件事情的时候，如果再次接到要做这件事情的通知，不管当前已经做了多少，都重新从头再做

我们的案例中，当用户连续输入abc三个字符的时候，我们希望查询的其实是abc这个关键词，而不是a查一次,b查一次，c查一次，所以当我们输入a的时候，不要立刻发送请求去获取数据，而是延迟500毫秒再发送，如果在500毫秒内，我们又输入了b,那么就要把输入a时候准备发送的请求取消，过500毫秒发送ab作为关键词，如果紧接着我们又输入了c,那么就要把输入b时候准备发送的请求取消，而是再等500毫秒，发送abc作为关键词到后台。

我们的案例中，当a的键盘被抬起时候，我们用定时器延迟500毫秒发送请求，但我们在500毫秒内输入了b,因此，在键盘抬起的驱动函数中我们一进来就取消了上一次的定时器，也就是a的定时器，那么a的请求就不会发送了，如果又连续输入了c,一进键盘抬起的驱动函数首先也是取消了b的定时器，然后过500毫秒发送的c抬起时候需要发送的请求，因此，我们连续输入了三个字，最终只有c的键盘被抬起时候才会发送请求。


```



#### 节流

```js
通俗的解释：
当我们重复做件事情的时候，要求在做的过程中（或者做这件事情的时间段内）不能被打扰，等到做完了才能再做这件事情。

我们点击按钮，启动倒计时，要求在倒计时的过程中，不能让用户继续点击按钮，这时候就需要编写一个变量flag默认为true,当点击按钮以后把flag改为false,只有为true才能启动定时器，等到倒计时结束再次把他改为true，这样就实现了节流效果

```





