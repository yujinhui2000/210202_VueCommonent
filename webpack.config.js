 const path = require('path')//用来解析路径相关信息的模块
 const HtmlWebpackPlugin = require('html-webpack-plugin')//引入html的构建
const { dirname } = require('path')

module.exports = {
    mode: 'production',//生产环境，有错误提示等

    entry:{//入口
        xxx:path.resolve(__dirname,'src/index.js')//__dirname:当前文件所在目录的绝对路径  C:\Users\Administrator\Desktop\code\model1
    },

    output:{//出口
        filename:'static/js/[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },

    module: {
        rules: [
            //es6=>es5
          {
            test: /\.js$/,  //用于匹配文件（.js）
            exclude: /(node_modules|bower_components)/,//被排除的文件
            include:[path.resolve(__dirname,'src')],//指定文件处理
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins:[

                ]
              }
            }
          },
          //处理css
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name:'static/img/[name].[hash:7].[ext]'
                }
              }
            ]
          }
        ]
      },
    plugins:[//插件
        new HtmlWebpackPlugin({
            template:'index.html',//以index.js作为模板页面
            filename:'index.html'//生成页面(在output指定的path下)
        })
    ],
    devServer:{
        open:true,//自动打开浏览器
        // quiet:true   安静模式
    },
    devtool:'eval-cheap-module-source-map'
}