import axios from 'axios'
import auth from "~/utils/auth";
// import auth from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
const request = axios.create({
    baseURL: "http://localhost:10000",
    timeout: 5000,
    headers:{
        "content-Type": "application/x-www-form-urlencoded"
    }
})
// request拦截器
request.interceptors.request.use(config => {
    let token=auth.getToken();
    if (token) {
        config.headers['X-User-Token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    console.log(`${config.method}   ${config.url}   请求成功`);
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    console.log(`${config.method}   ${config.url}   请求失败`);
    Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 15000) {
            console.log(`${response.config.method}   ${response.config.url}   响应状态码错误 ${res.message}`);
            Message({
                message: res.message,
                type: 'error',
            })
        } else {
            console.log(`${response.config.method}   ${response.config.url}   响应状态码成功`);
        }
        return res;
    },
    error => {
        if (error && error.message) {

        }
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default request