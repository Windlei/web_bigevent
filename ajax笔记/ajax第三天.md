#### get请求和post请求有什么不同？

```js
1：
get请求传参，参数以查询字符串的形式拼接在url地址后面,比如 name=xh&age=18
//创建ajax对象实例，后续所有的ajax操作都依靠创建出来的ajax实例对象
var xhr = new XMLHttpRequest();
//发送数据前的准备工作 配置请求方式和url地址
xhr.open('get',"http://www.liulongbin.top:3006/api/getbooks?id=1&name=xh");

2：
post请求传参，参数必须写在send方法中
post请求必须设置content-type属性，告知服务器当前传送的是什么类型的数据，并且必须在open和send方法中间
//创建ajax对象实例，后续所有的ajax操作都依靠创建出来的ajax实例对象
var xhr = new XMLHttpRequest();
//发送数据前的准备工作 配置请求方式和url地址
xhr.open('post',"http://www.liulongbin.top:3006/api/getbooks");
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send('name=xh&age=18');

```



#### 什么是json?

```js
1:
json是对象或者数组的字符串表示法。
说白了就是看起来像对象或者数组的字符串，他是目前后端交互过程中最常用的数据交换格式


2:
json的类型主要分为数组类型和对象类型，也就是用字符串表示数组或者使用字符串表示对象
var obj = {"name":"xionghui","age":18} // 对象

var obj2 = '{"name":"xionghui","age":18}'; // json

var arr = [1,2,3,4]; // 数组

var arr2 = '[1,2,3,4]' // json


3:
编写json时候的注意事项：
3-1： 属性名称必须用双引号
3-2： 属性值如果是字符串，也必须用双引号
3-3   属性值不能是undefined和函数

tip:
如果json格式写错了会有什么影响？
回答：
使用JSON.parse转化会出错
只能使用eval函数硬转

var obj = "{'name':'xh'}";
console.log(JSON.parse(obj))
console.log(eval('('+obj+')'))
```



#### 怎么实现json和对象的互转

```js
json转对象 (也被称为反序列化)：
//JSON.parse(json字符串);
JSON.parse('{"name":"xh","age":18}');

//eval('('+json字符串+')') ,优点是兼容性强，容错性强，缺点是性能差
var str = "{'name':'xh','age':18}";
eval('('+str+')');

对象转json (也被称为序列化):
//JSON.stringify(对象)
JSON.stringify({"name":"xh"})


把数据对象转换为字符串的过程，叫做序列化，例如：调用 JSON.stringify() 函数的操作，叫做 JSON 序列化。
把字符串转换为数据对象的过程，叫做反序列化，例如：调用 JSON.parse() 函数的操作，叫做 JSON 反序列化。
```



#### 如何编写自己的ajax函数

```js
function resolveData(data) {
  var arr = []
  for (var k in data) {
    var str = k + '=' + data[k]
    arr.push(str)
  }
  return arr.join('&')
}

// var res = resolveData({ name: 'zs', age: 20 })
// console.log(res)

function itheima(options) {
  var xhr = new XMLHttpRequest()

  // 把外界传递过来的参数对象，转换为 查询字符串
  var qs = resolveData(options.data)

  if (options.method.toUpperCase() === 'GET') {
    // 发起GET请求
    xhr.open(options.method, options.url + '?' + qs)
    xhr.send()
  } else if (options.method.toUpperCase() === 'POST') {
    // 发起POST请求
    xhr.open(options.method, options.url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText)
      options.success(result)
    }
  }
}
```



#### 怎么设置请求的时限？

```js
//如果网络请求消耗的时间过长，会导致用户体验不好，所以需要手动设定请求的时限，超出时限，需要做出对应的处理
var xhr = new XMLHttpRequest()
// 设置 超时时间，单位是毫秒
xhr.timeout = 3000
// 设置超时以后的处理函数
xhr.ontimeout = function() {
    console.log('请求超时了！');
    // location.href = "http://www.my.com"
}

```



#### 什么是FormData？怎么使用？

```js
FormData是h5标准中提出的一个对象，一般内置在浏览器中，js可以直接调用，但有兼容问题，最大的作用就是可以利用它向服务器传送二进制文件，比如，图片 视频 音频等，当然也可以传送普通的字符串数据

// 1. 通过new调用FormData，生成实例对象，该对象可以理解为是一个存在于内存中的虚拟表单
 var fd = new FormData();

// 2. 调用 append 函数，向 fd 中追加数据，相当于往虚拟的表单中追加数据
fd.append('uname', 'zs')
fd.append('upwd', '123456')

var xhr = new XMLHttpRequest()
xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')

// 用post传送FormData数据时候，不需要指定Content-Type，否则会按照字符串格式解析FormData数据
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

// 把整个虚拟表单作为参数直接放在send方法中进行传输
xhr.send(fd)

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText))
    }
}
```



#### 怎么使用FormData快速获取表单数据？

```html
<form id="form1">
        <input type="text" name="uname" autocomplete="off" />
        <input type="password" name="upwd" />
        <button type="submit">提交</button>
</form>

<script>
  // 1. 通过 DOM 操作，获取到 form 表单元素
    var form = document.querySelector('#form1')
    form.addEventListener('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()

        // 创建 FormData，快速获取到 form 表单中的数据
        // 表单中的input输入框必须有name属性，否则不能获取对应的属性值
        var fd = new FormData(form);

        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
        xhr.send(fd)

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
            }
        }
    });
</script>
```



#### 怎么实现上传预览功能？

```html
1: 需要在页面上准备一个上传的表单 <input type="file" />和一个上传按钮<button>上传</button>
和一个img标签。
2：给button添加点击事件，再点击的时候，获取选中的文件
3：把选中的文件赋值给FormData
4：使用ajax把FormData传送到后台
5：如果成功，需要把服务器返回的图片地址拼接到本地的img标签的src属性上，实现预览


<input id="file" type="file" multiple />   <button>上传</button>
<img src="" alt="">

<script>
     //监听上传的控件是否拥有对应选择的文件
    var myfile = document.querySelector('#file');
    var button = document.querySelector('button');
    var img = document.querySelector('img');

    button.addEventListener('click', function() {
        // 获取选中的文件，myfile.files保存的是一个文件列表，也是伪数组
        var file = myfile.files;
        // 判断用户时是否选择了文件
        if (file.length == 0) {
            alert("请先选择文件");
            return;
        };

        //把上传的图片文件发送到后台
        var fd = new FormData();
        //后台规定上传图片接口中参数名必须是avatar，参数值是我们选中的图片，我们的图片保存在上传控件的文		件列表中，是下表为0的那个元素，所以必须取出来。
        fd.append('avatar', file[0]);

        //掉用ajax发起上传
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
        xhr.send(fd);

        xhr.onload = function() {
            if (xhr.status == 200) {
                console.log(xhr.responseText)
                var obj = JSON.parse(xhr.responseText);
                //把服务器返回的地址拼接上服务器的域名，形成完整的图片地址，赋值给src,完成预览
                img.src = "http://www.liulongbin.top:3006" + obj.url;
            } else {
                alert('上传失败')
            }
        }
    })；
</script>
```

