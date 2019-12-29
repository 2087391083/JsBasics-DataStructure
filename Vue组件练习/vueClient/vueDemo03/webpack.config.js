const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// entry 入口文件可以是： 字符串、数组（可以有多个入口文件）、对象
// 出口 output
module.exports = {
    entry: "./src/js/enteyclient.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash:6].js"
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.css$/igm,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|jpg|jpeg)$/igm,
            use: ["file-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "用户登陆",  //生成的html title名字，在模板文件中用  <title><%= htmlWebpackPlugin.options.title %></title>调用即可
            // chunks:['login'],  //引入entry中的key名字的js文件，此处为login，打包后html后会自动引入login.js文件
            filename: 'index.html', // bulid目录下生成的html文件名
            template: './src/html/index.html', // 我们原来的index.html路径，作为模板
            inject: 'body',
            minify: {				  //压缩项配置
                removeComments: false, //是否清除HTML注释  
                collapseWhitespace: false, //是否压缩HTML  
                removeScriptTypeAttributes: false, //是否删除< script>的type="text/javascript"  
                removeStyleLinkTypeAttributes: false, //是否删除< style>和< link>的type="text/css"  
                minifyJS: false, //是否压缩页内JS  
                minifyCSS: true //是否压缩页内CSS  
            }
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: "./dist",
        host: "localhost",
        compress: true,
        port: 8080,
        open: true,
        hot: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    }
}

