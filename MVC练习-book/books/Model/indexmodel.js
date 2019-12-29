const mysql = require("mysql");
let bdbase = require("../Model/DbBase");
class indexmodel extends bdbase {
    constructor() {
        super();
        this.Table = "booksmsg";
    }

    getAllBooksMsg(page2, limit2, callback) {
        // console.log(page2,limit2);
        let sql = `select * from ${this.Table} order by publish DESC limit ${(page2 - 1)*limit2},${limit2};
                    select count(*) as nums from ${this.Table}`;
        this.mydb.query(sql, function (err, result) {
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

    //获取图书分类信息
    getKindDetailsList(mycid , callback) {
        // console.log(page,limit1);
        // let sql = `select * from ${this.Table} where fid=${myfid} limit ${(page-1)*limit1},${limit1};
        let sql = `select * from ${this.Table} where fid=${mycid};
                    select count(*) as allnums from ${this.Table}`;
        this.mydb.query(sql, function (err, result) {
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

    //推荐
    getRecommendList(page2, limit2, callback){
        let sql = `select * from ${this.Table} where recommend=1 order by publish DESC limit ${(page2 - 1)*limit2},${limit2};
                    select count(*) as nums from ${this.Table}`;
        this.mydb.query(sql, function (err, result) {
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

    //获取热门书籍信息
    getHotBooksList(page2, limit2, callback){
        let sql = `select * from ${this.Table} where readcount>=50 limit ${(page2 - 1)*limit2},${limit2};
                    select count(*) as nums from ${this.Table} where readcount>=50;`;
        this.mydb.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();

    }

    getCode(objdata,callback){
        let fieldstr = '';
        let field = '';
        let data = [];
        let isFirst = true;
        for (const f in objdata) {
            if (objdata.hasOwnProperty(f)) {
                fieldstr += (isFirst ? '' : ', ') + f;
                field += (isFirst ? '' : ', ') + '?';
                data.push(objdata[f]);
            }
            isFirst = false;
        }
        let sql = `insert into wxusers ( ${fieldstr} )  values (${field})`;
        this.mydb.query(sql, data, function (err, data) {
            if (err) {
                callback(err);
                console.log(err);
                return;
            }
            callback(data);
        });
        this.mydb.end();
    }
}
module.exports = indexmodel;