const { isNull } = require('lodash')

exports.response = {
    json: function (res, data) {
        let result = Object.assign({ code: 200 }, data)
        res.json(result)
    },
    error: function (res, msg, code) {
        let result = Object.assign({ code: 0 }, { msg, code: code || 0 })
        res.json(result)
    }
}

/**
 * 格式化日期时间
 *
 * @param {Object,String} time 日期时间
 * @param {String} cFormat 格式规则
 * @return 格式化后的日期
 *
 */
exports.parseTime = function (time, cFormat = '') {
    if (arguments.length === 0) {
        return null
    }
    // const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    const format = cFormat || '{y}-{m}-{d}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (`${time}`.length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = `0${value}`
        }
        return value || 0
    })
    return timeStr
}

//判断参数全部为空
exports.paramsIsNull = function (data) {
    let isNull = true
    for (let s in data) {
        if (data[s]) {
            isNull = false
        }
    }

    return isNull
}
