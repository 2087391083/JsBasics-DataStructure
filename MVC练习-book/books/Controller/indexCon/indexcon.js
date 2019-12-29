const express = require("express");
const bodyParser = require("body-parser");
const appIdMy=require("../../wxConfig");
const request =  require("request");
let router = express.Router();
let indexmodel = require("../../Model/indexmodel");
router.get("/", function (req, res) {
    res.send("首页");
});

//获取最新的书本信息
router.get("/indexbookslist",function(req,res){
    let page2 = req.query.page ? req.query.page : 1;
    let limit2 = req.query.limit ? req.query.limit : 10;
    // console.log(page2,limit2)
    new indexmodel().getAllBooksMsg(page2,limit2,function (reqdata){
        // console.log(reqdata);
        res.send({code : 1 ,data : reqdata});
    });
});

router.get("/kinddetailslist",function(req,res){
    // let page2 = req.query.page ? req.query.page : 1;
    // let limit2 = req.query.limit ? req.query.limit : 10;
    let mycid = req.query.cid;
    // console.log(mycid);
    new indexmodel().getKindDetailsList(mycid,function(reqdata){
        // new indexmodel().getKindDetailsList(myfid,function(reqdata){
        res.send({code : 1 ,data : reqdata});
    });
});

//推荐书籍
router.get("/recommendlist",function(req,res){
    let page2 = req.query.page ? req.query.page : 1;
    let limit2 = req.query.limit ? req.query.limit : 10;
    new indexmodel().getRecommendList(page2,limit2,function (reqdata){
        res.send({code : 1 ,data : reqdata});
    });
});

//获取热门书籍
router.get("/hotbookslist",function(req,res){
    let page2 = req.query.page ? req.query.page : 1;
    let limit2 = req.query.limit ? req.query.limit : 10;
    new indexmodel().getHotBooksList(page2,limit2,function (reqdata){
        res.send({code : 1 ,data : reqdata});
    });
});

router.get("/getcode",function(req,res){
    let nickname=req.query.nickName;
    let avatarUrl=req.query.avatarUrl;
    let codeId=req.query.codeId;
    let appid=req.query.appId;
    let appSecret = appIdMy.AppSecret;
    console.log(appSecret,appid);
    let requrl=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${codeId}&grant_type=authorization_code`;
    request(requrl , function(error, response, body){
        if(error){
            console.log(error);
            res.send({code : -1 , msg : "授权失败！"});
            return;
        }
        let reqdata = JSON.parse(body);
        let userInfo={
            session_key:reqdata.session_key,
            openid : reqdata.openid,
            nickName : nickname,
            avatarUrl : avatarUrl
        };
        new indexmodel().getCode(userInfo , function(reqdata){
            req.session.openid = userInfo.openid;
            req.session.session_key = userInfo.session_key;
            // console.log(res.header());
            // console.log(reqdata);
            res.send({code : 1 , msg : "授权成功"});
        });
    })
});

module.exports = router;