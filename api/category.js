import request from '@/utils/request'
const base="/base"
export default {
    getGategories(){
        return request({
            url:`${base}/category`,
            method:"get"
        })
    }
}