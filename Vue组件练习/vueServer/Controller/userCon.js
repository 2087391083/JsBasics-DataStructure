const express=require("express");
const usermodel = require("../Model/userModel");
const router = express.Router();

router.get("/getusermsg",function(req,res){
    new usermodel().getUserMsg(function(reqdata){
       res.json(reqdata);
    });
});


router.post("/login",function(req,res){
    let username = req.body.username;
    let pwd = req.body.pwd;
    console.log(username,pwd);
    new usermodel().UserLogin(username,pwd,function(reqdata){
        res.json(reqdata);
    });
});

router.post("/reg",function(req,res){
    let username = req.body.params.username;
    let pwd = req.body.params.pwd;
    new usermodel().CheckUser(username,function(results){
        if(results.length>0){
            res.json({code : -2 ,  msg : "用户已存在！"});
        }else{
            new usermodel().UserRegister(username,pwd,function(reqdata){
                res.json(reqdata);
            });
        }
    });


});

router.get("/getbookkinds",function(req,res){
    let fid=req.query.fid;
    new usermodel().getBookKinds(fid,function(reqdata){
        res.json(reqdata);
    });
});

module.exports=router;