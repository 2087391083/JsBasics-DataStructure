const mysql =require("mysql");
const dbconfig = require("../DbConfig");
class bdbase{
    constructor(){
        this.mydb=mysql.createConnection(dbconfig);
        this.mydb.connect();
    }
    end(){
        this.mydb.end();
    }
}
module.exports=bdbase;
