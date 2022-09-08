//引入express
var express = require('express');
// 生成express服务器
var app = express();
// 引入第三方post解析包
var bodyparser = require("body-parser");
// //引入跨域包
var cors = require('cors');
app.use(cors());
//接受普通表单和json字符串
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
//引入文件读取模块
var fs = require('fs');
//定义生成随机id的函数
function genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}


//获取数据的接口
app.get('/getData', (req, res) => {
    // 获取用户传递的id号
    let id = req.query.id;
    // 获取文件中存储的数据
    try {
        var alldata = fs.readFileSync("./data.json", 'utf8') ? JSON.parse(fs.readFileSync("./data.json", 'utf8')) : [];
    } catch (err) {
        let message = {
            code: 0,
            message: "请求数据失败",
            data: alldata
        }
        res.send(message);
        return;
    }
    //如果id存在，表示用户是根据id查询对应的用户信息
    if (id) {
        alldata.forEach(function(item, index) {
            if (id == item.id) {
                let message = {
                    code: 0,
                    message: "请求数据成功",
                    data: item
                }
                res.send(message);
            }
        })
    }
    // 否则返回所有的用户信息
    else {
        let message = {
            code: 0,
            message: "请求数据成功",
            data: alldata
        }
        res.send(message);
    }


});


//获取数据的接口
app.get('/getData2', (req, res) => {
    // 获取用户传递的id号
    let id = req.query.id;
    // 获取文件中存储的数据
    try {
        var alldata = fs.readFileSync("./data2.json", 'utf8') ? JSON.parse(fs.readFileSync("./data.json", 'utf8')) : [];
    } catch (err) {
        let message = {
            code: 0,
            message: "请求数据失败",
            data: alldata
        }
        res.send(message);
        return;
    }
    //如果id存在，表示用户是根据id查询对应的用户信息
    if (id) {
        alldata.forEach(function(item, index) {
            if (id == item.id) {
                let message = {
                    code: 0,
                    message: "请求数据成功",
                    data: item
                }
                res.send(message);
            }
        })
    }
    // 否则返回所有的用户信息
    else {
        let message = {
            code: 0,
            message: "请求数据成功",
            data: alldata
        }
        res.send(message);
    }


});


//新增数据的接口（分为批量新增和单独数据的新增）
app.post('/addData', (req, res) => {

    // 获取文件中存储的数据
    var alldata = fs.readFileSync("./data.json", 'utf8') ? JSON.parse(fs.readFileSync("./data.json", 'utf8')) : [];

    //如果用户传递是是一条数据
    //获取所有post请求的参数
    if (!req.body.length) {
        var adddata = req.body; // {id:1,name:"小红",age:"18",addr:"安徽省潜山县"}
        adddata.id = genID(6);
        //把传递的数据插入到总的数组中
        alldata.push(adddata);
        fs.writeFile('./data.json', JSON.stringify(alldata), function(err) {
            if (err) {
                var message = {
                    code: 0,
                    message: "添加数据失败",
                    data: alldata
                }
                res.send(message);
            } else {
                var message = {
                    code: 0,
                    message: "添加数据成功",
                    data: alldata
                }
                res.send(message);
            }
        })

    } else {
        // 如果用户传递的是多条数据
        var adddata = req.body; // [{id:1,name:"小红",age:"18",addr:"安徽省潜山县"},{id:1,name:"小红",age:"18",addr:"安徽省潜山县"}]

        // 给每条数据添加id
        adddata.forEach(function(item, index) {
            item.id = genID(6);
            alldata.push(item);
            console.log(alldata, "------", item)
            fs.writeFileSync('./data.json', JSON.stringify(alldata))
        });
        var message = {
            code: 0,
            message: "批量添加数据成功",
            data: alldata
        }
        res.send(message);
    }

});

// 根据id删除数据的接口
app.get('/delData', function(req, res) {
    // 获取文件中存储的数据
    var alldata = fs.readFileSync("./data.json", 'utf8') ? JSON.parse(fs.readFileSync("./data.json", 'utf8')) : [];
    var id = req.query.id;
    alldata.forEach(function(item, index) {
        console.log(item.id, '---', id)
            //找到一个就删除并且返回
        if (item.id == id) {
            alldata.splice(index, 1);
            fs.writeFile('./data.json', JSON.stringify(alldata), function(err) {
                if (err) {
                    res.send({
                        message: "删除失败",
                        code: 1
                    });
                } else {
                    res.send({
                        message: "删除成功",
                        code: 0
                    });
                }
            });

        }
    });

});

// 批量删除数据的接口
app.get('/delDataAll', function(req, res) {
    fs.writeFileSync('./data.json', "");
    res.send({
        message: "批量删除成功",
        code: 0
    })
});


// 编辑数据的接口
app.post('/editData', function(req, res) {
    // 获取文件中存储的数据
    var alldata = fs.readFileSync("./data.json", 'utf8') ? JSON.parse(fs.readFileSync("./data.json", 'utf8')) : [];
    // 获取编辑时候传递的新数据
    let newdata = req.body;
    console.log(newdata)
        // 遍历找出与用户传递的id相匹配的对象
    alldata.forEach(function(item, index) {
        if (item.id == newdata.id) {
            console.log(alldata[index], "---------", newdata)
            alldata[index] = newdata;
        }
    });

    fs.writeFile('./data.json', JSON.stringify(alldata), function(err) {
        if (err) {
            res.send({
                message: "编辑失败",
                code: 1
            })

        } else {
            res.send({
                message: "编辑成功",
                code: 0
            });
        }
    });

})


app.listen(3000);