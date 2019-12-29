const express = require("express");
const router=express.Router();
const stuModel=require("../Model/stuModel");

router.post("/add",function(req,res){
    let username=req.body.username;
    let discription=req.body.discription;
    let addtimes=new Date();
    new stuModel().Add(username,discription,addtimes,function(reqdata){
        res.json({code:1,msg:"添加成功！"});
    });
});
 
router.get("/getinfo",function(req,res){
    new stuModel().getInfo(function(reqdata){
        res.json(reqdata);
    });
});

router.post("/del",function(req,res){
    let sid=req.body.sid;
    new stuModel().Del(sid,function(reqdata){
        res.json(reqdata);
    });
});

module.exports=router;