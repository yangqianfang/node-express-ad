var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
    res.json({ code: -1, message: 'permission denied', data: null })
})

module.exports = router
