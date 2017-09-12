/* ========================================================
                        小程序配置文件
======================================================== */

// 域名
// var host = 'http://127.0.0.1:3000';
var host = 'https://wxapp.thunf.cn';

// 下面的地址配合云端 Demo 工作
export const service = {
  // 列表接口 GET
  list: `${host}/bookmall/list`,

  // 筛选页接口 GET 
  tags: `${host}/bookmall/tags`,

  // 假装有收藏接口 POST
  collect: `${host}/bookmall/list`,

  // 主域
  host
}

export default {
  service
}