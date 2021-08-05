var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
    res.send('hellow--test--test2')
})

module.exports = router
