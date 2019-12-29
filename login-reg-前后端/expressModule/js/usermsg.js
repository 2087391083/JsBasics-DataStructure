const express = require("express");
const rotuer=express.Router();
rotuer.get("/",function (req,res){
    req.send("用户相关信息首页！！！");
});
module.exports=rotuer;