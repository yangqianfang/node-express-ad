/*
 *@description: 生成slq语句 postgresql数据库
 *@author: yangqianfang
 *@date: 2021-07-29 18:40:05
 *@version: V1.0.0
    // let listSql = `select * from ${table} where  city='${city}' limit ${pageSize} OFFSET ${
    //     (page - 1) * pageSize
    // } `
    // console.log(slqText)
    /* let listSql = `select * from ${table} where  city='${city}' limit ${pageSize} OFFSET ${
    (page - 1) * pageSize
    } ` 
 */
class SQL {
    constructor(table) {
        this.table = table //表名称
    }

    /* 
     *@params: data: [
                { key: 'id', value: id, rule: '=' },
                { key: 'city', value: city, rule: '=' },
                { key: 'position', value: position, rule: '=' },
                { key: 'stime', value: stime, rule: '>' },
                { key: 'etime', value: etime, rule: '<' },
                { key: 'status', value: status, rule: '=' }
            ],
     *@description:拼接条件查询 
     return id=1 and ciey='北京市' and stime>232323 and etime<32323232
     */
    getQuery(data) {
        let arr = [],
            sql = ''
        data.forEach((item) => {
            if (item.value) {
                arr.push(`${item.key}${item.rule}'${item.value}'`)
            }
        })
        if (arr.length > 0) {
            sql += `where `
        }
        sql += arr.join(' and ')
        return sql
    }
    // 查询总数
    getCountSql(data) {
        let str = `select COUNT(*) from ${this.table} `
        return str + this.getQuery(data)
    }
    /*
     *@functionName:getSelectSql
     *@params:  
        {
            data: [
                { key: 'id', value: id, rule: '=' },
                { key: 'city', value: city, rule: '=' },
                { key: 'position', value: position, rule: '=' },
                { key: 'stime', value: stime, rule: '>' },
                { key: 'etime', value: etime, rule: '<' },
                { key: 'status', value: status, rule: '=' }
            ],
            page: {
                page,
                pageSize
            }
        } 
     *@description:分页查询语句
     */
    getSelectSql(queryData) {
        let sql = `select *  from ${this.table} ` + this.getQuery(queryData.data)
        if (queryData.page) {
            sql += ` order by id desc limit ${queryData.page.pageSize} OFFSET ${
                (queryData.page.page - 1) * queryData.page.pageSize
            }`
        }
        return sql
    }

    getUpdateStr(data) {
        // {anme,is_del,islogin}
        console.log(data)
        let arr = [],
            sql = ''
        for (let i in data) {
            if (data[i]) {
                arr.push(`${i} = '${data[i]}'`)
            }
        }

        sql += arr.join(' , ')
        return sql
    }
    /*
     *@functionName:
     *@params1: id
     *@params2: {name,sex,age}
     *@author: yangqianfang
     *@date: 2021-07-30 14:36:20
     *@version: V1.0.0
     */
    getUpdateSql(id, params) {
        let sql = `UPDATE ${this.table} SET ${this.getUpdateStr(params)} `
        sql += `WHERE id = ${id}`
        return sql
    }
}

module.exports = SQL
