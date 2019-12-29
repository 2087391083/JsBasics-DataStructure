const express=require("express");
const app=express();
app.get("/",function (req,res){
    res.send("用户首页");
});

app.listen(8000,"127.0.0.1");