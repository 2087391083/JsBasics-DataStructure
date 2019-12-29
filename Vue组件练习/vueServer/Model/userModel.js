const mydb = require("../mydb");
class userModel extends mydb{
    constructor(){
        super();
        this.table="booksmsg";
    }
    getUserMsg(callback){
        let sql=`select * from ${this.table}`;
        this.mysql.query(sql,function(err , results){
            if(err){
                console.log(err);
                callback({ code : -1 , msg : "数据获取失败！" });
                return;
            }
            callback( { code : 1 , reqdata : results } );
        });
    }

    UserLogin(username,pwd,callback){
        // let sql=`select * from vueuser where 1;`;
        let sql=`select * from vueuser where username=? and pwd=?;`;
        this.mysql.query(sql , [username,pwd] , function(err,results){
            if(err){
                console.log(err);
                callback({ code : -1 , msg : "数据获取失败！" });
                return;
            }
            callback( { code : 1 , reqdata : results } );
        });
        this.mysql.end();
    }

    UserRegister(username , pwd , callback){
        let sql=`insert into vueuser (username,pwd) values (?,?);`;
        this.mysql.query(sql,[username,pwd],function(err,results){
            if(err){
                callback({ code : -1 , msg : "数据获取失败！" });
                console.log(err);
                return;
            }
            callback( { code : 1 , reqdata : results } );
        });
        this.mysql.end();
    }

    CheckUser(username,callback){
        let sql=`select * from vueuser where username=?`;
        this.mysql.query(sql,[username],function(err,results){
            if(err){
                console.log(err);
                return;
            }
            callback(results);
        });
    }

    getBookKinds(fid,callback){
        let sql=`select * from booksmsg where fid=?`;
        this.mysql.query(sql,[fid],function(err,results){
            if(err){
                console.log(err);
                return;
            }
            callback(results);
        });
    }
}
module.exports=userModel;