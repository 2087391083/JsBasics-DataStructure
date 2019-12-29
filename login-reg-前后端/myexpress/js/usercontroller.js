const express = require("express");
const mysql = require("mysql");
const userModel = require("./userModel");
const rotuer = express.Router();
// const status=[
//     {
//         code:"1",
//         msg:"用户登陆成功！"
//     },{
//         code:"-1",
//         msg:"账号不存在!"
//     },{
//         code:"0",
//         msg:"登陆密码错误!"
//     }
// ];



rotuer.get("/", function (req, res) {
    res.send("用户相关信息首页！！！");
});
rotuer.get("/login", function (req, res) {
    let username = req.query.username;
    let pwd = req.query.pwd;
    console.log(req.query);
    new userModel().getUserInput(username, pwd, function (result) {
        if (result.code == -2) {
            res.send("数据库错误");
        } else {
            res.send(result);
        }
        // status.forEach(function(el,index){
        //     if(el.code===result){
        //         res.send(status[index].msg);
        //     }
        // });
    });
    // res.send("用户登陆界面.！！");
});
rotuer.get("/reg", function (req, res) {
    res.send("用户注册界面！！！");
});
module.exports = rotuer;