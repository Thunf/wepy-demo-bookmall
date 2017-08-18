'use strict';

// model名称，即表名
const model = exports.model = 'test';

// 表结构
exports.schema = [{
  id: { type: String, unique: true, required: true },
  title: { type: String },
  name: { type: String }
}, {
  collection: model,
  autoIndex: true,
  versionKey: false
}];


// 静态方法:http://mongoosejs.com/docs/guide.html#statics
exports.statics = {};

// http://mongoosejs.com/docs/guide.html#methods
exports.methods = {
  list: function* () {
    return this.model(model).find();
  }
}
