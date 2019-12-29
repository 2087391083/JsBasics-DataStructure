const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();
let kindmodel = require("../../Model/kindmodel");
router.get("/", function (req, res) {
    res.send("首页");
});

router.post("/addbookkind", function (req, res) {
    let name = req.body.name;
    let fid = req.body.fid;
    new kindmodel().setAddBookKind(name, fid, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata);
            return;
        }
        res.send(reqdata);
    });
});

router.get("/getFaKind", function (req, res) {
    new kindmodel().getFaKind(function (reqdata) {
        res.send(reqdata);
    });
});

router.get("/bookkindlist", function (req, res) {
    // let page=req.query.page;
    // let limit1=req.query.limit;
    let page = req.query.page ? req.query.page : 1;
    let limit1 = req.query.limit ? req.query.limit : 10;

    console.log(req.query, page, limit1);
    new kindmodel().getAllBooks(page, limit1, function (reqdata) {
        let reData = { "code": 0, "msg": "", "count": reqdata[1][0].allnums , "data": reqdata[0] };
        // console.log(reqdata,reqdata[1]);
        res.send(reData);
    });
});

router.get("/delkind", function (req, res) {
    let cid = req.query.cid;
    // console.log(cid);
    new kindmodel().setdelkind(cid, function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata);
            return;
        }
        res.send(reqdata);
    });
});

// getallcate
router.get("/getallcate", function (req, res) {
    new kindmodel().getAllCate(function (reqdata) {
        if (reqdata.code == -2) {
            res.send(reqdata);
            return;
        }
        res.send(reqdata);
    });
});

//saveamendkind
router.post("/saveamendkind",function(req,res){
    new kindmodel().saveAmendKind(req.body,function(reqdata){
        res.send(reqdata);
    });
});

module.exports = router;