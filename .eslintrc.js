module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended', // 参考 https://cn.eslint.org/docs/rules/
        'prettier'
    ],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'prettier/prettier': 'error',
        // allow async-await
        'generator-star-spacing': 'off'
    }
}
