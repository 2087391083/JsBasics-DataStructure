const express = require("express");
const multer = require("multer");
let router = express.Router();
let hostname = "http://luoyi:8000/";
// let upload=multer({dest : __dirname + '/.././uploads'});
// console.log(__dirname);
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/.././uploads/')
    },
    filename: function (req, file, cb) {
        cb(null , new Date().getTime() + "_" + Math.random().toString().substr(2,6)  + "." + file.originalname.split(".").pop());
    }
});
let upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), function (req, res) {
    let resdata = {
        "code" : 0,
        "msg" : "",
        "data" : {}
    }
    resdata.data.src = hostname + "uploads/" + req.file.filename;
    // console.log(req.file);
    res.send(resdata);
});

module.exports = router;