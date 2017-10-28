'use strict';
const config = require('../config');
/**
 * webpack InsterNunjucksHtml 
 * 添加nunjucks 到 htmlWebpackPlugin 中去
 * @param {Object} options
 */
 function InsterNunjucksHtml(options) {
    options = options || {};
};

InsterNunjucksHtml.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        let extendHtml = '{% extends "partial/'+config.partial+'/layout.html" %}';
        let webpackStyle ='',
            webpackScript='';
        if (htmlPluginData.assets.css) {
            htmlPluginData.assets.css.forEach((item)=>{
                webpackStyle+= '<link rel="stylesheet" href="' + item + '"/>';
            });
          }
          if (htmlPluginData.assets.js) {
            htmlPluginData.assets.js.forEach((item)=>{
                webpackScript+= '<script src="' + item + '"></script>';
            });
          }
        let webpackBlockStyle = '{% block webpack_style %}'+webpackStyle+'{% endblock %}';
        let webpackBlockScript = '{% block webpack_script %}'+webpackScript+'{% endblock %}';
          htmlPluginData.html = extendHtml + webpackBlockStyle + htmlPluginData.html + webpackBlockScript;
          callback(null, htmlPluginData);
        });
      });
};

module.exports = InsterNunjucksHtml;
