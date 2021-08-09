const { mapData } = require('../../utils/config')
const { select, updateById, insert, getActiveList } = require('../../model/adclient')
const { response, parseTime } = require('../../utils/index')
const timeRule = '{y}-{m}-{d} {h}:{i}:{s}'

module.exports = {
    // 分页列表
    getList: async function (req, res) {
        let { id, city, position, stime, etime, status, page, pageSize } = req.query
        let baseData = { id, city, position, stime, etime, status, page, pageSize }
        try {
            let data = await select(baseData)
            // 格式化返回数据
            data.list.map((item) => {
                if (item.is_del === 2) {
                    item.status = '已关闭'
                }

                if (item.is_del === 1) {
                    item.status = '进行中'
                }

                if (item.end_time < parseInt(new Date().getTime() / 1000)) {
                    item.status = '已结束'
                }
                item.content = item.active_info
                item.show_order = item.sort
                item.login_attribute = mapData.loginAttribute[item.login_type][item.login_attribute]
                item.create_time = parseTime(item.create_time, timeRule)
                item.end_time = parseTime(item.end_time, timeRule)
                item.start_time = parseTime(item.start_time, timeRule)
                item.position = mapData.position[item.position]
                item.login_type = mapData.loginType[item.login_type]
            })

            response.json(res, { data })
        } catch (error) {
            response.error(res, error.message)
        }
    },

    /*
     *@description:查询返回符合条件进行中的广告
     *@params1: city 城市 ,position 广告位置,login_type 登陆状态,login_attribute 用户属性
     *@return:list
     */
    getActiveList: async function (req, res) {
        let { city, position, login_type, login_attribute } = req.body,
            nowTime = parseInt(new Date().getTime() / 1000)

        if (city) {
            city = ['全国', city]
        }

        let baseData = {
            city: city,
            position,
            login_type,
            login_attribute,
            start_time: nowTime,
            end_time: nowTime,
            is_del: 1
        }

        try {
            let data = await getActiveList(baseData)
            response.json(res, { data })
        } catch (error) {
            response.error(res, error.message)
        }
    },

    //查询一条
    getInfoById: async function (req, res) {
        let { id } = req.body
        if (!id) {
            response.error(res, '缺少id参数')
            return
        }
        try {
            let data = await select({ id })
            response.json(res, { data: data.list[0] || {} })
        } catch (error) {
            response.error(res, error.message)
        }
    },

    // 删除
    delete: async function (req, res) {
        const { id, is_del } = req.query
        try {
            await updateById(id, { is_del })
            response.json(res, { msg: '执行成功！' })
        } catch (error) {
            response.error(res, error.message)
        }
    },

    // 插入数据库
    insert: async function (req, res) {
        // let json = eval('(' + req.body.data + ')')

        let {
            id,
            city,
            position,
            login_type,
            login_attribute,
            sort,
            show_type,
            channel_type,
            type,
            url,
            start_time,
            end_time,
            active_info,
            image,
            memo,
            admin_id,
            is_del,
            create_time,
            active_image,
            open_app_type,
            bg_image,
            font_color
        } = req.body

        let subData = {
            id,
            city,
            position,
            login_type,
            login_attribute,
            sort,
            show_type,
            channel_type,
            type,
            url,
            start_time,
            end_time,
            active_info,
            image,
            memo,
            admin_id,
            is_del,
            create_time,
            active_image,
            open_app_type,
            bg_image,
            font_color
        }

        /* if (!sort) {
            response.error(res, '排序不能为空')
            return
        }
        if (!start_time) {
            response.error(res, '开始时间不能为空')
            return
        }
        if (!end_time) {
            response.error(res, '结束时间不能为空')
            return
        }

        if (start_time > end_time) {
            response.error(res, '开始时间不能大于结束时间')
            return
        } */

        // 判断所有字段为空
        let isNull = true
        for (let s in subData) {
            if (subData[s]) {
                isNull = false
            }
        }

        if (isNull) {
            response.error(res, '字段不正确')
            return
        }

        if (!id) {
            try {
                await insert(subData)
                response.json(res, { msg: '执行成功！' })
            } catch (error) {
                console.log(error)
                response.error(res, error.message)
            }
        } else {
            try {
                await updateById(subData)
                response.json(res, { msg: '更新成功！' })
            } catch (error) {
                response.error(res, error.message)
            }
        }
    },

    // 插入数据库
    update: async function (req, res) {
        let {
            id,
            city,
            position,
            login_type,
            login_attribute,
            sort,
            show_type,
            channel_type,
            type,
            url,
            start_time,
            end_time,
            active_info,
            image,
            memo,
            admin_id,
            is_del,
            create_time,
            active_image,
            open_app_type,
            bg_image,
            font_color
        } = req.body

        let subData = {
            id,
            city,
            position,
            login_type,
            login_attribute,
            sort,
            show_type,
            channel_type,
            type,
            url,
            start_time,
            end_time,
            active_info,
            image,
            memo,
            admin_id,
            is_del,
            create_time,
            active_image,
            open_app_type,
            bg_image,
            font_color
        }

        if (!id) {
            response.error(res, '字段id不能为空')
            return
        }

        try {
            await updateById(subData)
            response.json(res, { msg: '更新成功！' })
        } catch (error) {
            response.error(res, error.message)
        }
    }
}
