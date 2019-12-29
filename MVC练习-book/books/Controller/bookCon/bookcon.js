const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();
let bookmodel = require("../../Model/bookmodel");

//-----------
// var cookieParser = require('cookie-parser');
// let app = new express();
// let secret = "12656";
// app.use(cookieParser(secret));
// app.use(function (req, res, next) {
//     console.log(req.signedCookies.username); // chyingp
//     next();
// });

// app.get("/",function(req,res){
//     res.cookie("username", "123456");
// });

// app.use(function (req, res, next) {
//     res.cookie("username", "123456", { signed: true });
//     // res.end('ok');
//     next();
// });

//-----------

router.get("/", function (req, res) {
    res.send("首页");
});

//添加图书信息
//图书信息修改
router.post("/addbookinfo", function (req, res) {
    delete req.body.avatar;
    new bookmodel().addBookInfo(req.body, function (reqdata) {
        res.send(reqdata);
    });
});

//获取所有图书信息
router.get("/getallbookinfo", function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    let limit1 = req.query.limit ? req.query.limit : 10;
    new bookmodel().getAllBookInfo(page, limit1, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata);
            return;
        }
        // console.log(reqdata);
        let reData = { "code": 0, "msg": "", "count": reqdata[1][0].countsnum, "data": reqdata[0] };
        res.send(reData);
    });
});

router.get("/delbook", function (req, res) {
    let bid = req.query.bid;
    new bookmodel().setdelbook(bid, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata);
            return;
        }
        res.send(reqdata);
    });
});

//获取当前要编辑行的数据
//获取书籍详细信息
router.get("/getcurrecord", function (req, res) {
    let bid = req.query.bid;
    // console.log(bid);
    new bookmodel().getCurRecordData(bid, function (reqdata) {
        res.send(reqdata);
    });
});

//
// 保存修改图书信息
router.post("/savebookmsg", function (req, res) {
    // console.log(req.body);
    new bookmodel().setSaveBookMsg(req.body, function (reqdata) {
        res.send(reqdata);
    });
});

//获取搜索到的相关书籍
router.get("/search", function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    let limit1 = req.query.limit ? req.query.limit : 10;
    new bookmodel().getSearchResult(req.query.q, page,limit1, function (reqdata) {
        // console.log(reqdata);
        res.send(reqdata);
    });
});

module.exports = router;


