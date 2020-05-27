import request from '@/utils/request'
const base="/category"
export default {
    getGategories(){
        return request({
            url:`${base}`,
            method:"get"
        })
    }
}