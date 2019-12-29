const express=require("express");
const router=express.Router();
router.get("/",function (req,res){
    res.send("图书管理首页！");
});
router.get("/books",function (req,res){
    res.send("图书详细信息界面！");
});
module.exports=router;