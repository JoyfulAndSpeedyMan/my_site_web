import request from '@/utils/request'
import qs from 'qs'
const base="/spit"
export default {
    getSpit(page,size){
        return request({
            url:`${base}/${page}/${size}`,
            method:"get"
        })
    },
    spitThumb(id){
        let data=qs.stringify({id});
        return request({
            url:`${base}/thumb`,
            method:"put",
            data
        })
    },
    spitUnthumb(id){
        let data=qs.stringify({id});
        return request({
            url:`${base}/thumb`,
            method:"delete",
            data
        })
    },
    //获取评论列表
    getSpitComments(page,size){
        return request({
            url:`${base}/comment/${page}/${size}`,
            method:"get"
        })
    },
    //发表评论
    publishComment(spitId,replyId,content){
        let data=qs.stringify({spitId,replyId,content});
        return request({
            url:`${base}/comment`,
            method:"put"
        })
    },
    //评论点赞
    spitCommentThumb(id){
        let data=qs.stringify({id});
        return request({
            url:`${base}/comment/thumb`,
            method:"put",
            data
        })
    },
    //取消评论点赞
    spitCommentUnthumb(id){
        let data=qs.stringify({id});
        return request({
            url:`${base}/comment/thumb`,
            method:"delete",
            data
        })
    }
}