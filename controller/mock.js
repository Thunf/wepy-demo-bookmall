'use strict';

// 设置为非路由
module.exports.__controller__ = false;

// 模拟mock数据
module.exports.get = function(pathname){
    // 初始化数据
    let _jsonData = null;

    // 尝试寻找对应JSON文件
    try {
        const strPath = `${pathname}`.replace(/(^\/|\/$|\.json$)/g, '');
        _jsonData = require(`../mock/${strPath}.json`);
    } catch (e) {
        console.log("[ERROR MOCK]NOT FOUND: ", e.message);
    }

    return _jsonData;
}
