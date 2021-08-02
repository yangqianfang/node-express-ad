// conf/db.js
// MySQL数据库联接配置
exports.jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: 0,
            msg: '操作失败'
        })
    } else {
        const result = Object.assign({ code: 200 }, ret)
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
