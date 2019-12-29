const mysql = require("mysql");
const dbbase = require("./DbBase");
class usermodel extends dbbase {
    getUserInput(username, pwd, callback) {
        let sql = "select * from tempusers where username=?";
        // where username=? and pwd=?
        // console.log(this.mydb);
        this.mydb.query(sql, [username], function (err, results) {
            if (err) {
                callback({ code: -2, msg: err });
            } else if (results[0] == undefined) {
                callback({ code: -1, msg: "用户不存在" });
            } else if (results[0].username != pwd) {
                callback({ code: 0, msg: "密码错误" });
            } else if (results[0].username == pwd) {
                callback({ code: 1, msg: "用户登录成功" });
            }
        })
        //[username,pwd]表示给上面的sql中的占位符传值
    }
}

module.exports = usermodel;