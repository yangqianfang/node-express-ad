// 引入连接池
const { pool } = require('./db')
// SQL拼接对象
let SQL = require('../utils/sql')
// 操作小程序表
let sqlText = new SQL('applet_advert')

/*
 *@functionName: select
 *@params: id, city, position, stime, etime, status, page, pageSize
 *@description: 分页查询方法
 *@author: yangqianfang
 */
exports.select = async function (query) {
    let { id, city, position, start_time, end_time, status, page, pageSize } = query
    let params = {
        data: [
            { key: 'id', value: id, rule: '=' },
            { key: 'city', value: city, rule: '=' },
            { key: 'position', value: position, rule: '=' },
            { key: 'start_time', value: start_time, rule: '>=' },
            { key: 'end_time', value: end_time, rule: '<=' },
            { key: 'status', value: status, rule: '=' }
        ]
    }
    // 有分页加入分页参数
    if (page) {
        params.page = {
            page: page || 1,
            pageSize: pageSize || 10
        }
    }
    // 获取SQL语句
    const countSql = sqlText.getCountSql(params.data)

    // 查询总条数

    let client = await pool.connect()
    let listSql = sqlText.getSelectSql(params)
    try {
        // 总条数
        let countRow = await client.query(countSql)
        // 列表数据
        const list = await client.query(listSql)
        let count = countRow.rows[0].count
        let data = {
            list: list.rows
        }
        if (page) {
            data.page = {
                count: parseInt(count),
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                totalPage: Math.ceil(count / params.page.pageSize)
            }
        }
        return data
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}

/*
 *@functionName:
 *@params: query{ city, show_source, start_time, end_time, is_del }
 *@description: 查询进行中的广告
 *@author: yangqianfang
 */
exports.getActiveList = async function (query) {
    let { city, show_source, start_time, end_time, is_del } = query
    let params = {
        data: [
            { key: 'city', value: city, rule: 'in' },
            { key: 'show_source', value: show_source, rule: '=' },
            { key: 'start_time', value: start_time, rule: '<=' },
            { key: 'end_time', value: end_time, rule: '>=' },
            { key: 'is_del', value: is_del, rule: '=' }
        ]
    }

    let client = await pool.connect()
    let listSql = sqlText.getSelectSql(params)

    try {
        // 列表数据
        const list = await client.query(listSql)

        let data = {
            list: list.rows
        }

        return data
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}
/*
 *@functionName: updateById
 *@params2: {id,name,is_del }
 */
exports.updateById = async function (params) {
    // 获取SQL语句
    const updateSql = sqlText.getUpdateSql(params)
    // 查询总条数
    let client = await pool.connect()
    try {
        await client.query(updateSql)
    } catch (error) {
        throw new Error(error)
    } finally {
        client.release()
    }
}

/*
 *@functionName: updateById
 *@params1: id
 *@params2: {  is_del }
 */
exports.insert = async function (params) {
    // 获取SQL语句
    const updateSql = sqlText.getInsertSql(params)
    // 查询总条数
    let client = await pool.connect()
    try {
        let res = await client.query(updateSql)
        return res
    } catch (error) {
        throw new Error(error)
    } finally {
        client.release()
    }
}
