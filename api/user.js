import request from '@/utils/request'
const base = "/user"
export default {
    register() {
        return request({
            url: `${base}/register`,
            method: "post"
        })
    },
    login(user) {
        return request({
            url: `${base}/login`,
            method: "post",
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