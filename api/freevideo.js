import request from '@/utils/request'
import qs from 'qs'
const base = "/video"
export default {
    getList(page, size) {
        return request({
            url: `${base}/list/${page}/${size}`,
            method: "get"
        })
    },
    thumb(id) {
        let data=qs.stringify({id:id});
        return request({
            url: `${base}/thumb`,
            method: "put",
            data
        })
    },
    unthumb(id) {
        let data=qs.stringify({id:id});
        return request({
            url: `${base}/unthumb`,
            method: "put",
            data
        })
    },
    getKind() {
        return request({
            url: `${base}/kind`,
            method: "get"
        })
    },
    shareCommit(share){
        return request({
            url: `${base}/share`,
            method: "put",
            data:share,
            headers:{"content-Type": "application/json"}
        })
    }

}