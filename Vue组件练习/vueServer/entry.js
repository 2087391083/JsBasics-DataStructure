const express=require("express");
const mysql = require("mysql");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(function (req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use("/user" , require("./Controller/userCon"));

app.listen(8000,function(){
    console.log("服务已启动，端口8000正在监听中......");
});

