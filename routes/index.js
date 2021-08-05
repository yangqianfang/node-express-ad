var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
    res.setHeader("Content-Type", "application/json;charset=utf-8")
    res.send('{"code":-1,"message":"permission denied","data":null}')
})

module.exports = router
