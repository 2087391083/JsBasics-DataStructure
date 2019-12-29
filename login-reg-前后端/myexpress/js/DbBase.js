const mydba=require("mysql");
const dbconfig=require("./DbConfig");
class DbBase{
    constructor(){
        this.mydb=mydba.createConnection(dbconfig);
        this.mydb.connect();
    }
    end(){
        this.mydb.end();
        // 关闭数据库连接
    }
}
module.exports=DbBase;