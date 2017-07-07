const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: './',
        filename: "js/[name]-[hash].js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: function() {
                        return [
                            require('autoprefixer')({
                                broswers: ['last 5 versions']
                            })
                        ]
                    }
                }
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname + '/node_modules/'),
                include: path.resolve(__dirname + '/src')
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loaders: ['file-loader?name=images/[name]-[hash:5].[ext]', "image-webpack-loader"]
            }
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.less', '.vue'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            'src': path.resolve(__dirname, './src'),
            'common': path.resolve(__dirname, './src/common'),
            'components': path.resolve(__dirname, './src/components')
        }
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by wpy'),
        new HtmlWebpackPlugin({
            title: 'Amumu\'s Blog',
            inject: true,
            filename: 'index.html',
            template: 'index.html',
            favicon:'./favico.ico'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        }),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
}