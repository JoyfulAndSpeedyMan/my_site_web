import request from '@/utils/request'
import qs from 'qs'
const base = "/spit"
export default {
    //获得吐槽列表
    getSpit(page, size) {
        return request({
            url: `${base}/${page}/${size}`,
            method: "get"
        })
    },
    //吐槽点赞
    spitThumb(id) {
        let data = qs.stringify({ id });
        return request({
            url: `${base}/thumb`,
            method: "put",
            data
        })
    },
    //取消吐槽点赞
    spitUnthumb(id) {
        let data = qs.stringify({ id });
        return request({
            url: `${base}/thumb`,
            method: "delete",
            data
        })
    },
    //发布吐槽
    publishSpit(content,tags) {
        let data = qs.stringify({ content,tags });
        return request({
            url: `${base}`,
            method: "put",
            data
        })
    },
    //获取吐槽标签列表
    getSpitTags() {
        return request({
            url: `${base}/tag`,
            method: "get"
        })
    },
    //获取评论列表
    getSpitComments(page, size) {
        return request({
            url: `${base}/comment/${page}/${size}`,
            method: "get"
        })
    },
    //发表评论
    publishComment(spitId, replyId, content) {
        let data = qs.stringify({ spitId, replyId, content });
        return request({
            url: `${base}/comment`,
            method: "put",
            data
        })
    },
    //评论点赞
    spitCommentThumb(id) {
        let data = qs.stringify({ id });
        return request({
            url: `${base}/comment/thumb`,
            method: "put",
            data
        })
    },
    //取消评论点赞
    spitCommentUnthumb(id) {
        let data = qs.stringify({ id });
        return request({
            url: `${base}/comment/thumb`,
            method: "delete",
            data
        })
    }
}