const { Pool } = require('pg') //连接池
const db =
    process.env.NODE_ENV === 'development'
        ? {
              // 测试环境数据库配置
              user: 'work',
              host: '172.16.30.3',
              database: 'manage',
              password: 'ifengniao',
              port: 5432
          }
        : {
              // 线上数据库配置
              user: 'work',
              host: '172.16.30.3',
              database: 'manage',
              password: 'ifengniao',
              port: 5432
          }
exports.pool = new Pool(db)
