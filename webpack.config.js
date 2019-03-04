const path = require('path')

module.exports = {
    mode: 'production',
    entry: './virtual-dom.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false // 是否压缩打包文件 默认为 true
    }
}