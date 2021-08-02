// 引入连接池
const { pool } = require('./db')
// SQL拼接对象
let SQL = require('../utils/sql')
let sqlText = new SQL('advert')

/*
 *@functionName: select
 *@params: id, city, position, stime, etime, status, page, pageSize
 *@description: 分页查询方法
 *@author: yangqianfang
 */
exports.select = async function (query) {
    let { id, city, position, stime, etime, status, page, pageSize } = query
    let params = {
        data: [
            { key: 'id', value: id, rule: '=' },
            { key: 'city', value: city, rule: '=' },
            { key: 'position', value: position, rule: '=' },
            { key: 'start_time', value: stime, rule: '>=' },
            { key: 'end_time', value: etime, rule: '<=' },
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
                count,
                page,
                pageSize: pageSize,
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
 *@functionName: updateById
 *@params1: id
 *@params2: {  is_del }
 */
exports.updateById = async function (id, params) {
    // let { id, is_del } = query
    // 获取SQL语句
    const updateSql = sqlText.getUpdateSql(id, params)
    // 查询总条数
    let client = await pool.connect()
    try {
        await client.query(updateSql)
    } catch (error) {
        // reject(error)
    } finally {
        client.release()
    }
}
