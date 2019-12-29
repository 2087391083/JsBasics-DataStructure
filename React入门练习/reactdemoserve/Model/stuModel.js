const mysql=require("../mydb");
class stuModel extends mysql{
    constructor(){
        super();
        this.table="reactDemo"
    }
    Add(username,discription,addtimes,callback){
        let sql=`insert into ${this.table} (username,discription,addtimes) values (?,?,?);`;
        this.mysql.query(sql,[username,discription,addtimes],function(err,results){
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback(results);
        });
    }
    getInfo(callback){
        let sql=`select * from ${this.table} where status=1;`;
        this.mysql.query(sql,function(err,results){
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback(results);
        });
    }
    Del(sid,callback){
        let sql=`update ${this.table} set status=0 where sid=?;`;
        this.mysql.query(sql,[sid],function(err,results){
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback({code:1,msg:"删除成功！"});
        });
    }
}
module.exports= stuModel;
