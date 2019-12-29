const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();
let usermodel = require("../../Model/usersmodel");
router.get("/", function (req, res) {
    res.send("首页");
});

router.get("/login", function (req, res) {
    let username = req.query.username;
    let pwd = req.query.pwd;
    new usermodel().getLoginMsg(username, pwd, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata.msg);
            return;
        } else if (reqdata.code == -1) {
            res.send(reqdata);
        } else if (reqdata.code == 0) {
            res.send(reqdata);
        } else if (reqdata.code == 1) {
            res.send(reqdata);
        }
    });
});

router.post("/loginpost", function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let pwd = req.body.pwd;
    new usermodel().getLoginMsg(username, pwd, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata.msg);
            return;
        } else if (reqdata.code == -1) {
            res.send(reqdata);
        } else if (reqdata.code == 0) {
            res.send(reqdata);
        } else if (reqdata.code == 1) {
            res.send(reqdata);
        }
    });
});



router.get("/reg", function (req, res) {
    let username = req.query.username;
    let nickname = req.query.nickname;
    let pwd = req.query.pwd;
    let ctimes = req.query.ctimes;
    console.log(username, nickname, pwd, ctimes);
    let cur = new Date(ctimes);
    ctimes = cur.getFullYear() + "-" + (cur.getMonth() + 1) + "-" + cur.getDate();
    new usermodel().setLoginMsg(username, nickname, pwd, ctimes, function (reqdata) {
        res.send(reqdata);
    });
});

router.post("/regpost", function (req, res) {
    let username = req.body.username;
    let nickname = req.body.nickname;
    let pwd = req.body.pwd;
    // let ctimes = req.query.ctimes;
    console.log(username, nickname, pwd);
    // let cur=new Date(ctimes);
    // ctimes = cur.getFullYear() + "-" + (cur.getMonth()+1) + "-" + cur.getDate();
    console.log("req.body", req.body);
    new usermodel().setLoginMsg(username, nickname, pwd, function (reqdata) {
        res.send(reqdata);
    });
});

router.post("/uleava",function(req,res){
    let content = req.body.content;
    let cookie= req.body.cookie;
    console.log(content,cookie);
    new usermodel().getULeava(content,cookie,function(reqdata){
        res.send(reqdata);
    });
});

router.get("/getLeava",function(req,res){
    new usermodel().getLeavaMsg(function(reqdata){
        res.send(reqdata)
    });
});

module.exports = router;