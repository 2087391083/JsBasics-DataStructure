const express=require("express");
const app=new express();
app.use("/users",require("./usercontroller"));
app.use("/books",require("./booksmsg"));
app.get("/",function (req,res){
    res.send("用户首页");
});

//加载静态资源
app.use("/view",express.static("../view"));
app.use("/",express.static("../html"));

app.listen(8000,function (){
    console.log("服务在启动中......");
});