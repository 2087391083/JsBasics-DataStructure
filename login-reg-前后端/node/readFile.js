const http=require("http");
const fs=require("fs");
http.createServer(function(res,req){
    //fs.readFile(path , "utf-8", callback);
    fs.readFile("./readFile.html",function (err,data){
        if(err){
            console.log(err);
            req.end();
            return ;
        }
        req.write(data);
        req.end();
    });
}).listen(8000,function(){
    console.log("你的服务已启动，端口是8000");
});




