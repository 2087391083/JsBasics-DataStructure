const cookieParser = require('cookie-parser');
const session = require('express-session');
// 把session信息存储到数据库里面  1
let MySQLStore = require('express-mysql-session')(session);
// 对cookie信息进行“加密” == 签名  提供字符类型的秘钥
let secret = 'com.mydomain.app.h519061test';
exports.cookie = cookieParser(secret);

let sessionStore = new MySQLStore(require(__dirname + "/DbConfig"));
exports.session = session({
    key: 'sessionid',
    secret: secret,
    resave: false,
    store: sessionStore,
    name: 'sessionid',  //connect.sid
    saveUninitialized: false,
    cookie: { maxAge: 24 * 3600 * 1000 }
})

/*
各参数意义：
secret：用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
name：表示cookie的name，默认cookie的name是：connect.sid。
maxAge：cookie过期时间，毫秒。
resave：是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
saveUninitialized： 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
*/


