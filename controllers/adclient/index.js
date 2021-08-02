const { mapData } = require('../../utils/config')
const { select, updateById } = require('../../model/adclient')
const { jsonWrite, parseTime } = require('../../utils/index')
const timeRule = '{y}-{m}-{d} {h}:{i}:{s}'
module.exports = {
    getList: async function (req, res) {
        let { id, city, position, stime, etime, status, page, pageSize } = req.query
        let baseData = { id, city, position, stime, etime, status, page, pageSize }
        try {
            let data = await select(baseData)
            // 格式化返回数据
            data.list.map((item) => {
                item.create_time = parseTime(item.create_time, timeRule)
                item.end_time = parseTime(item.end_time, timeRule)
                item.start_time = parseTime(item.start_time, timeRule)
                item.position = mapData.position[item.position]
                item.login_type = mapData.loginType[item.login_type]
            })

            jsonWrite(res, { data })
        } catch (error) {
            jsonWrite(res)
        }
    },

    getInfoById: async function (req, res) {
        let { id } = req.query
        let data = await select({ id })
        jsonWrite(res, { data: data.list[0] })
    },

    // 缺乏错误处理
    delete: async function (req, res) {
        const { id, is_del } = req.query
        await updateById(id, { is_del })
        jsonWrite(res, { msg: '执行成功！' })
    },

    add: async function (req, res, next) {
        // jsonWrite(res, {aa:222});
    }
}
