/* 
    封装axios
*/
// 引入axios
import axios from 'axios';
// 引入qs
import qs from 'qs';
// 设置默认请求服务器根目录
axios.defaults.baseURL = 'http://172.16.9.9:3000';
// 写一个axios的请求拦截器 （在axios请求发送之前）
axios.interceptors.request.use(config => {
    // 获取token
    const token = window.localStorage.getItem('token');
    // 在请求头中携带token
    config.headers.authorization = `Bearer ${token}`
    return config;
});
// 写一个axios的响应拦截器 
axios.interceptors.response.use(response => {
    //接收数据
    let { error_code } = response.data;
    if (error_code) {
        window.localStorage.removeItem('token');
    }
    return response
})

// 封装get方法 和 post方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}


