const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");
var cookieParser = require('cookie-parser');
let app=new express();

////////-----------
// app.use(cookieParser());
// app.use(function(req,res,next){
//     res.cookie("username","123456");
//     next();
// });
////////////-----------

//content-type  application/x-www-form-urlencoded
//对特殊字符进行url编码
app.use(bodyParser.urlencoded({ extended : true}));
//content-type  application/json
app.use(bodyParser.json());

//使用中间件实现跨域
app.use(function (req,res,next){
    res.setHeader("Access-Control-Allow-Origin","http://luoyi");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//      res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use(require('../CookieSession').cookie);
app.use(require('../CookieSession').session);

app.use("/users",require("./usersCon/userscon")); //用户相关的子路由配置
app.use("/kinds",require("./kindsCon/kindcon")); //书籍分类相关的子路由配置
app.use("/index",require("./indexCon/indexcon")); //用户首页相关的子路由配置
app.use("/book",require("./bookCon/bookcon")); //书籍相关的子路由配置
app.use("/upload",require("./uploadCon/uploadcon")); //配置文件上传的相关子路由

// 加载的静态资源
app.use("/books",express.static("../Views"));
app.use("/Static",express.static("../Static"));
app.use("/uploads",express.static(__dirname +"/uploads")); //图片

app.get("/",function(req,res){
    res.send("用户首页！");
});
app.listen(8000,function (){
    console.log("你的端口正在监听中......");
});





