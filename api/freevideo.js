import request from '@/utils/request'
const base = "/video"
export default {
    getList(page, size) {
        return request({
            url: `${base}/list/${page}/${size}`,
            method: "get"
        })
    },
    thumb(id) {
        return request({
            url: `${base}/thumb`,
            method: "put",
            data: {
                id
            }
        })
    },
    unthumb(id) {
        return request({
            url: `${base}/unthumb`,
            method: "put",
            data: {
                id
            }
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
            data:share
        })
    }

}