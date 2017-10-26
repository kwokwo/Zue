'use strict';
/**
 * webpack InsterNunjucksHtml 
 * 添加nunjucks 到 htmlWebpackPlugin 中去
 */

let InsterNunjucksHtml = (options)=>{
    options = options || {};
};

InsterNunjucksHtml.prototype.apply = (compiler) => {
    compiler.plugin();
};
