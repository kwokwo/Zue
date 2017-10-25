const glob = require('glob');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
module.exports = {
    /**
     * getMultiEntry
     * 获取全部的入口文件,动态组成对应模板文件的entry
     * @return {Object} 返回返回对应的路径
     */
    getMultiEntry() {
        let entrys = {},
            htmls = [];
        // glob 获取除了template 模板文件 转为js 对应的编译入口 entry
        let files = glob.sync(config.frontendProject + '/src/pages/**!(template|templates)/*.' + config.templateExt);
        // 循环获取文件
        files.forEach((_file) => {
            let file = path.parse(_file);
            // 匹配对应的js文件
            let jsPath = path.resolve(file.dir, file.name + '.js');
            // 判断是否存在同名的js文件
            if (fs.existsSync(jsPath)) {
                if (config.env == 'dev') {
                    entrys['static/' + file.name] = [jsPath, hotMiddlewareScript];
                } else {
                    entrys['static/' + file.name] = jsPath;
                }
                let _webpackHtml = this.getMultiWebpackHtml(file);
                htmls.push(_webpackHtml);
            } else {
                console.log(path.resolve(file.dir, file.name + '.js') + ' not find');
            }
        });
        return {
            entrys: entrys,
            htmls: htmls,
        };
    },
    getMultiWebpackHtml(file) {
        let srcPath = config.frontendProject + '/src';
        let dirPath = file.dir.slice(srcPath.length);
        console.log(dirPath);
        return new HtmlWebpackPlugin({
            filename: 'templates/' + dirPath + '/' + file.name + '.' + config.templateExt,
            template: file.dir + '/' + file.name + file.ext,
            chunks: ['static/common', 'static/' + file.name],
            inject: true,
            chunksSortMode: 'manual', // 手动设置chunks 顺序
            alwaysWriteToDisk: true, // 是否一致写入硬盘 dev环境也写入,为了给express找到文件
        });
    },
};
