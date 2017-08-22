'use strict'
/**
 * bookmall专用数据接口
 * wx小程序：wepy-demo-bookmall 
 */

const mock = require('./mock.js')
const mockData = {
  list: mock.get('bookmall/list'),
  tags: mock.get('bookmall/tags'),
}

// 列表接口
exports.list = function*() {
  const data = mockData.list
  this.body = {
    code: data ? 0 : 404,
    data: data || {},
    message: 'success'
  }
}

// 搜索页接口
exports.tags = function*() {
  const data = mockData.tags
  this.body = {
    code: data ? 0 : 404,
    data: data || {},
    message: 'success'
  }
}


exports.test = function*() {
  let test = yield this.mongo('test').list();
  this.body = {
    code: test ? 0 : 404,
    data: test || {},
    message: 'success'
  }
}
