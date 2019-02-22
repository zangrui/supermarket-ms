/* 
    封装axios
*/
// 引入axios
import axios from 'axios';
// 引入qs
import qs from 'qs';
//引入elementui的Message模块
import { Message } from 'element-ui'
//引入路由文件
import router from '@/router'
// 设置默认请求服务器根目录
axios.defaults.baseURL = 'http://127.0.0.1:3000';
// 写一个axios的请求拦截器 （在axios请求发送之前）
axios.interceptors.request.use(config => {
    // 获取token
    const token = window.sessionStorage.getItem('token');
    // 在请求头中携带token
    config.headers.authorization = `Bearer ${token}`
    return config;
});
// 写一个axios的响应拦截器 
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        //提示
        Message.error(error.response.data);
        //删除token
        window.sessionStorage.removeItem('token');
        //跳转到登录页
        router.push('/login');
    }
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


