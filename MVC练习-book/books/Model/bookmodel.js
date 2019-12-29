const mysql = require("mysql");
let bdbase = require("../Model/DbBase");
class bookmodel extends bdbase {
    constructor() {
        super();
        this.Table = "booksmsg";
    }

    addBookInfo(objdata, callback) {
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
        let sql = `insert into ${this.Table} ( ${fieldstr} )  values (${field})`;
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

    getAllBookInfo(page, limit1, callback) {
        let sql = `select * from ${this.Table} limit ${(page - 1) * limit1},${limit1};
                    select count(*) as countsnum from ${this.Table}`;
        this.mydb.query(sql, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }

    setdelbook(bid, callback) {
        let sql = `delete from ${this.Table} where bid=${bid}`;
        this.mydb.query(sql, [bid], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }

    //获取当前要编辑的书本信息
    //获取书籍的详细信息
    getCurRecordData(bid, callback) {
        let sql = `select * from ${this.Table} where bid=${bid}`;
        this.mydb.query(sql, [bid], function (err, data) {
            if (err) {
                callback(err);
                console.log(err);
                return;
            }
            // console.log(data);
            callback(data);
        });
    }

    //保存修改图书信息
    setSaveBookMsg(objdata, callback) {
        let fieldstr = '';
        let data = [];
        console.log(objdata);
        for (const f in objdata) {
            console.log(f);
            if (f != "bid" && objdata.hasOwnProperty(f)) {
                fieldstr += f + "=" + "?" + ",";
                data.push(objdata[f]);
            }
        }
        data.push(objdata.bid);
        let f = fieldstr.substring(0, fieldstr.length - 1);  
        console.log(f,data);
        let sql = `update ${this.Table} set ${f} where bid=?`;
        this.mydb.query(sql, data, function (err, data) {
            if (err) {
                callback(err);
                console.log(err);
                return;
            }
            callback(data);
        });
    }

    //获取图书搜索结果
    getSearchResult(q , page , limit1, callback){
        let sql = `select * from ${this.Table} where name like "%${q}%" limit ${(page - 1) * limit1},${limit1};
                    select count(*) as nums from ${this.Table} where name like "%${q}%";`;
        this.mydb.query(sql , [q] , function(err , result){
            if(err){
                console.log(err);
                callback(err);
                return;
            }
            callback(result);
        });
        this.mydb.end();
    }
}
module.exports = bookmodel;