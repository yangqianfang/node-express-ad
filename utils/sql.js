/*
 *@description: 生成slq语句 postgresql数据库
 *@author: yangqianfang
 *@date: 2021-07-29 18:40:05
 *@version: V1.0.0
 *@用法:let slq = new SQL("表名")
 */
class SQL {
    constructor(table) {
        this.table = table //表名称
    }

    /* 
    *@description:拼接条件查询 
     *@params: data: [
                { key: 'id', value: id, rule: '=' },
                { key: 'city', value: city, rule: '=' },
                { key: 'position', value: position, rule: '=' },
                { key: 'stime', value: stime, rule: '>' },
                { key: 'etime', value: etime, rule: '<' },
                { key: 'status', value: status, rule: '=' }
            ],   
     @return id=1 and ciey='北京市' and stime>232323 and etime<32323232
     */
    getQuery(data) {
        let arr = [],
            sql = ''
        data.forEach((item) => {
            if (item.value) {
                if (Array.isArray(item.value)) {
                    let str = '',
                        values = item.value
                    values.forEach((item, i) => {
                        str += `'${item}'`
                        if (i != values.length - 1) {
                            str += ','
                        }
                    })
                    arr.push(`${item.key} ${item.rule} (${str})`)
                } else {
                    arr.push(`${item.key}${item.rule}'${item.value}'`)
                }
            }
        })
        if (arr.length > 0) {
            sql += `WHERE `
        }
        sql += arr.join(' AND ')
        return sql
    }

    // 查询总数
    getCountSql(data) {
        let str = `SELECT COUNT(*) FROM ${this.table} `
        return str + this.getQuery(data)
    }

    /*
    *@description:分页查询语句
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

    /*
     *@description: 格式化方法去除主键返回拼接条件
     *@return string: name='a',age='22',position='3'
     */
    getUpdateStr(data, primaryKey) {
        delete data[primaryKey] //拼接条件删除主键
        let arr = [],
            sql = ''
        for (let i in data) {
            if (data[i]) {
                arr.push(`${i}='${data[i]}'`)
            }
        }
        sql += arr.join(',')
        return sql
    }

    /*
     *@description:更新一条记录sql
     *@params1: 数据对象 {name,sex,age}
     *@params2: 主键默认id
     */
    getUpdateSql(params, primaryKey = 'id') {
        let pk = params[primaryKey]
        let sql = `UPDATE ${this.table} SET ${this.getUpdateStr(params, primaryKey)} `
        sql += `WHERE ${primaryKey} = ${pk}`
        return sql
    }

    /*
     *@description:格式化入库字段
     @params {name:"test",sex:"",age"16,class:undefined}
     @return {
         keys:"name,sex,age"
         value:`'testname','男','15'`
     }    
    */
    formatInsertKeys(data) {
        let keys = [],
            values = []
        for (let s in data) {
            if (data[s]) {
                keys.push(s)
                values.push(data[s])
            }
        }
        return {
            keys: keys,
            values: values
        }
    }

    /*
     *@description:拼接插入数据库sql
     *@params1: 数据对象 {city:'北京市',position:2}
     *@return:INSERT INTO advert (city,"position") VALUES ('北京市','2');
     */
    getInsertSql(params) {
        let formatKeys = this.formatInsertKeys(params)
        let values = formatKeys.values,
            str = ''

        values.forEach((item, i) => {
            str += `'${item}'`
            if (i != values.length - 1) {
                str += ','
            }
        })

        let sql = `INSERT INTO ${this.table} (${formatKeys.keys.toString()}) VALUES (${str})`
        return sql
    }
}

module.exports = SQL
