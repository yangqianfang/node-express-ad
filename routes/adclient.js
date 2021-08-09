var express = require('express')
var router = express.Router()
let adClient = require('../controllers/adclient/index')
/*  get list */
router.get('/list', function (req, res, next) {
    adClient.getList(req, res, next)
})

router.get('/delete', function (req, res, next) {
    adClient.delete(req, res, next)
})

router.post('/info', function (req, res, next) {
    adClient.getInfoById(req, res, next)
})

router.post('/insert', function (req, res, next) {
    adClient.insert(req, res, next)
})

router.post('/update', function (req, res, next) {
    adClient.update(req, res, next)
})

router.post('/getActiveList', function (req, res, next) {
    adClient.getActiveList(req, res, next)
})

module.exports = router
