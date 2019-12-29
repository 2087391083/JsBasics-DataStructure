const mysql = require("mysql");
let bdbase = require("../Model/DbBase");
class usersmodel extends bdbase {
    getLoginMsg(username, pwd, callback) {
        let sql = "select * from book_users where username=?";
        this.mydb.query(sql, [username], function (err, result) {
            if (err) {
                callback({ code: -2, msg: err });
                return;
            }
            if (result.length == 0) {
                callback({ code: -1, msg: "用户名不存在！" });
            } else if (result[0].pwd != pwd) {
                callback({ code: 0, msg: "登录密码错误！" });
            } else if (result[0].pwd == pwd) {
                callback({ code: 1, msg: "登录成功！" });
            }
        });
        this.mydb.end();
    }
    setLoginMsg(username, nickname, pwd, callback) {
        // let sql="insert into book_users (username,nickname, pwd,ctimes) values (?,?,?,?) "
        let sql = "insert into book_users (username,nickname, pwd) values (?,?,?)";
        this.mydb.query(sql, [username, nickname, pwd], function (err, result) {
            if (err) {
                callback("错误~~~~");
                return;
            }
            callback({ code: 1, msg: "注册成功！" })
        });
        this.mydb.end();
    }

    getULeava(conent,cookie, callback) {
        let sql = "insert into userleava (content,cookie) values (?,?)";
        this.mydb.query(sql, [conent,cookie], function (err, result) {
            if (err) {
                callback("错误~~~~");
                return;
            }
            callback({ code: 1, msg: "留言成功！" })
        });
        this.mydb.end();
    }

    getLeavaMsg(callback){
        let sql = "select * from userleava";
        this.mydb.query(sql, function (err, result) {
            if (err) {
                callback("错误~~~~");
                return;
            }
            callback({ code: 1, data: result })
        });
        this.mydb.end();
    }
}
module.exports = usersmodel;