const mysql = require("mysql");
let bdbase = require("../Model/DbBase");
class kindmodel extends bdbase {
    constructor() {
        super();
        this.Table = "category";
    }
    getFaKind(callback) {
        let sql = `select * from ${this.Table} where fid=?`;
        this.mydb.query(sql, [0], function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }

    setAddBookKind(name, cid, callback) {
        let sql = `insert into ${this.Table} (name,fid) values (?,?)`;
        this.mydb.query(sql, [name, cid], function (err, result) {
            if (err) {
                callback("错误~~~~");
                return;
            }
            callback(result)
        });
        this.mydb.end();
    }

    getAllBooks(page, limit1, callback) {
        console.log(page,limit1);
        let sql = `select * from ${this.Table} limit ${(page-1)*limit1},${limit1};
                    select count(*) as allnums from ${this.Table}`;
        this.mydb.query(sql, [page,limit1], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            // console.log(result);
            callback(result);
        });
        this.mydb.end();
    }

    //图书分类管理  删除
    setdelkind(cid,callback){
        let sql=`delete from ${this.Table} where cid=${cid}`;
        this.mydb.query(sql,[cid],function(err,result){
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }

    //获取所有图书分类
    getAllCate(callback) {
        let sql = `select * from ${this.Table}`;
        this.mydb.query(sql, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }

    //更新用户修改分类信息
    saveAmendKind(dataobj,callback){
        let sql=`update ${this.Table} set name=?,fid=? where cid=?`;
        this.mydb.query(sql,[dataobj.name,dataobj.fid,dataobj.cid],function(err,data){
            if(err){
                callback(err);
                console.log(err);
                return;
            }
            callback(data);
        });
        this.mydb.end();
    }
    
}
module.exports = kindmodel;