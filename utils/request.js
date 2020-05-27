import axios from 'axios'
import auth from "~/utils/auth";
// import auth from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
const request = axios.create({
    baseURL: "http://www.pin90.top:7300/mock/5ec506d7f34d0c0945a128b8",
    timeout: 3000
})
// request拦截器
request.interceptors.request.use(config => {
    if (auth.getToken()) {
        config.headers['X-User-Token'] = auth.getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    console.log(config.url + ' 请求成功');
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    console.log(config.url + '请求失败');
    Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
    response => {
        /**
        * code为非20000是抛错 可结合自己业务进行修改
        */
        const res = response.data
        if (res.code !== 15000) {
            console.log(response.config.url + ' 响应状态码错误');
            Message({
                message: res.message,
                type: 'error',
            })
        } else {
            console.log(response.config.url + ' 响应状态码成功');
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