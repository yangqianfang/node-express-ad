var createError = require('http-errors')
var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
var logger = require('morgan')
var responseTime = require('response-time')
var app = express()
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false })) // 接收post参数 username=aaa&passworld=bbb
app.use(express.json()) // 接收post 对象{password:'aaa',passworld:'bbbb'}
app.use(responseTime())
const basePath = '/api'
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
var indexRouter = require('./routes/index')
var adclientRouter = require('./routes/adclient')
var adappletRouter = require('./routes/adapplet')
app.use('/', indexRouter)
/* 客户端广告路由 */
app.use(`${basePath}/clientAdver`, adclientRouter)
/* 小程序端广告路由 */
app.use(`${basePath}/appletAdver`, adappletRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, '404'))
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
