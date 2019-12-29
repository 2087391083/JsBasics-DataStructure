const fs=require("fs");
if(!fs.existsSync("./test/mydir/views")){
    fs.mkdir("./test/mydir/views",{recursive:true},function(err){
        if(err){
            console.log("创建失败！");
            return;
        }
    });
}
