var express = require('express')
var router = express.Router()
let adClient = require('../controllers/adclient/index')
console.log(adClient)
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
router.post('/add', function (req, res, next) {
    adClient.add(req, res, next)
})

module.exports = router
