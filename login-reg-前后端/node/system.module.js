const http=require("http");
const fs=require("fs");
const querystring=require("querystring");
const path=require("path");
const url=require("url");
// console.log(__dirname);//获取当前文件所在的目录（不包括文件名）
// console.log(__filename);//获取当前文件所在的完整路径（包括文件名）


// curfile == "/" ? curfile="/index.html" : curfile;
http.createServer(function (req,res){
    let path=url.parse(req.url,true);
    console.log(path.query);
    path.pathname = path.pathname =="/" ? "/index.html" : path.pathname;
    fs.readFile("."+path.pathname,"utf-8",function (err , data){
        if(err){
            // console.log(err);
            // res.write("你访问的文件路径不存在！");
            res.end();
            return;
        }
        res.write(data);
        res.end();
    });

    // res.setHeader("Content-Type","text/html;charset=utf-8");
    // res.write("我是用http创建的服务");
    // res.end();
}).listen(8000,function (){
    console.log("服务启动中......");
});

