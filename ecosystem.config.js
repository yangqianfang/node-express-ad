module.exports = {
    apps: [
        {
            name: 'node-server',
            script: './bin/www',
            exec_mode: 'cluster',
            watch_options: {
                usePolling: true
            },
            env_dev: {
                NODE_ENV: 'development', // 环境参数，当前指定为生产环境 process.env.NODE_ENV
                PORT: '80' // process.env.PORT
            },
            env_test: {
                NODE_ENV: 'development', // 环境参数，当前指定为开发环境 pm2 start app.js --env test
                PORT: '80'
            },
            env_prod: {
                // 环境参数，当前指定为测试环境 pm2 start app.js --env production
                NODE_ENV: 'prod',
                PORT: '80'
            }
        }
    ]

    // deploy : {
    //   production : {
    //     user : 'SSH_USERNAME',
    //     host : 'SSH_HOSTMACHINE',
    //     ref  : 'origin/master',
    //     repo : 'GIT_REPOSITORY',
    //     path : 'DESTINATION_PATH',
    //     'pre-deploy-local': '',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    //     'pre-setup': ''
    //   }
    // }
}
