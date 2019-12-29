const mySql = require("mysql");
class myDb{
    constructor(){
        this.mysql=mySql.createConnection(require("./dbConfig"));
        this.mysql.connect();
    }
    end(){
        this.mysql.end();
    }
}
module.exports=myDb;