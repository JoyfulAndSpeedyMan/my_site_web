import request from '@/utils/request'
import qs from 'qs'
const base = "/user"
export default {
    register(user) {
        return request({
            url: `${base}/register`,
            method: "post",
            data:user,
            headers:{"content-Type": "application/json"}
        })
    },
    sendRegisterCode(phone) {
        return request({
            url: `${base}/register/code`,
            method: "post",
            data:qs.stringify({phone:phone})
        })
    },
    login(user) {
        let data=qs.stringify(user);
        return request({
            url: `${base}/login`,
            method: "post",
            data,
        })
    },
    getBaseInfo(){
        return request({
            url: `${base}/baseInfo`,
            method: "get",
        })
    },
    getInfo(){
        return request({
            url: `${base}`,
            method: "get",
        })
    },
    getMessage(page,size){
        return request({
            url: `${base}/message/${page}/${size}`,
            method: "get",
        })
    }
}