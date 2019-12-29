const express=require("express");
const ejs=require("ejs");
const ueditor_backend=require("ueditor-backend");
const app=express();
app.set("view engine","html");
app.engine(".html",require("ejs").__express);
app.set("views",__dirname+"/views");
app.use(express.static(__dirname+"/public"));
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//初始化文本编辑器
ueditor_backend(app);
app.get("/",function (req,res){
    res.render("index");
})
app.listen(8000,()=>{
    console.log("服务器正在监听中....");
});