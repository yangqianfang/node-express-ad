const { updateById, select, insert, getActiveList } = require('../../model/adapplet')
const { response, paramsIsNull } = require('../../utils/index')

module.exports = {
    /*
     *@description:查询返回符合条件进行中的广告
     *@params1: city 城市 ,position 广告位置,login_type 登陆状态,login_attribute 用户属性
     *@return:list
     */
    getActiveList: async function (req, res) {
        let { city, show_source } = req.body,
            nowTime = parseInt(new Date().getTime() / 1000)

        if (city) {
            city = ['全国', city]
        }

        let baseData = {
            city: city,
            show_source,
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

    // 插入数据库
    insert: async function (req, res) {
        let {
            id,
            image,
            is_del,
            sort,
            create_time,
            start_time,
            end_time,
            city,
            position,
            show_source,
            ad_name,
            memo,
            url,
            admin_id
        } = req.body

        let subData = {
            id,
            image,
            is_del,
            sort,
            create_time,
            start_time,
            end_time,
            city,
            position,
            show_source,
            ad_name,
            memo,
            url,
            admin_id
        }

        // 判断字段是否全部为空
        if (paramsIsNull(subData)) {
            response.error(res, '缺少字段')
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
            image,
            is_del,
            sort,
            create_time,
            start_time,
            end_time,
            city,
            position,
            show_source,
            ad_name,
            memo,
            url,
            admin_id
        } = req.body

        let subData = {
            id,
            image,
            is_del,
            sort,
            create_time,
            start_time,
            end_time,
            city,
            position,
            show_source,
            ad_name,
            memo,
            url,
            admin_id
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
