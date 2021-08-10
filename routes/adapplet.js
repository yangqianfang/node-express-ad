var express = require('express')
var router = express.Router()
let adApplet = require('../controllers/adapplet/index')

router.post('/insert', function (req, res, next) {
    adApplet.insert(req, res, next)
})

router.post('/update', function (req, res, next) {
    adApplet.update(req, res, next)
})

router.post('/getActiveList', function (req, res, next) {
    adApplet.update(req, res, next)
})
router.post('/info', function (req, res, next) {
    adApplet.getInfoById(req, res, next)
})

module.exports = router
