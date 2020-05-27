import request from '@/utils/request'
const base="/spit"
export default {
    getSpit(page,size){
        return request({
            url:`${base}/${page}/${size}`,
            method:"get"
        })
    }
}