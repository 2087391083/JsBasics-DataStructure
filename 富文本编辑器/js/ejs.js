const express=require("express");
const ejs=require("ejs");
const app=express();
// app.set("view engine","ejs");
app.set("view engine","html");
app.engine(".html",require("ejs").__express);
app.set("js",__dirname+"/js");
app.get("/",function (req,res){
    res.render("index");
});
app.listen(8000,function (){
    console.log("服务正在监听客户端请求");
});