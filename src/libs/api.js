import axios from 'axios'

// 统一请求路径前缀
let base = ''
// let base = 'http://localhost:60155';

export const getRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
    // headers: {
    //     'accessToken': accessToken
    // }
  })
}

export const postRequest = (url, params) => {
  // let accessToken = getStore("accessToken");
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'accessToken': accessToken
    }
  })
}
//  Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
// 引用axios
//  声明导出接口getRequest函数
// 传入url params参数
// 声明get/post 赋值url 和params