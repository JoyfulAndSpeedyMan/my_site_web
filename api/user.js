import request from '@/utils/request'
import qs from 'qs'
const base = "/user"
export default {
    register(phone,password,code) {
        let data=qs.stringify({phone,password,code});
        return request({
            url: `${base}/register`,
            method: "post",
            data
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
            url: `${base}/info/baseInfo`,
            method: "get",
        })
    },
    getInfo(){
        return request({
            url: `${base}/info`,
            method: "get",
        })
    },
    getMessage(page,size){
        return request({
            url: `${base}/message/${page}/${size}`,
            method: "get",
        })
    },
    changePassword(password,code){
        let data=qs.stringify({password,code});
        return request({
            url: `${base}/password/change`,
            method: "post",
            data,
        })
    },
    sendChangePasswordCode(phone){
        let data=qs.stringify({phone});
        return request({
            url: `${base}/password/change/code`,
            method: "post",
            data,
        })
    },
    changeUsername(username){
        let data=qs.stringify({username});
        return request({
            url: `${base}/info/username`,
            method: "put",
            data,
        })
    },
    changeNickname(nickname){
        let data=qs.stringify({nickname});
        return request({
            url: `${base}/info/nickname`,
            method: "put",
            data,
        })
    }
    
}