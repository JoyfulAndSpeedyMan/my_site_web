<template>
  <div class="spit-index">
    <div class="spit-index-left">
      <Card class="spit-index-card" v-for="(spit,index) in spits" :key="spit.id">
        <div class="spit-index-inner-card">
          <div class="spit-index-info">
            <el-avatar :src="spit.userAvatar"></el-avatar>
            <p class="t1" style=" display: inline-block;margin-left:10px">{{spit.userNickname}}</p>
            <div class="spit-index-tags">
              <el-tag class="tag" v-for="tag in spit.tags" :key="tag" effect="light">{{tag}}</el-tag>
            </div>
          </div>
          <hr />
          <p class="t2">{{spit.title}}</p>
          <p class="cont">{{spit.content}}</p>
          <div class="spit-index-card-bottom">
            <div class="publish-date">发表时间: {{spit.createTime}}</div>
            <el-button
              type="text"
              icon="el-icon-s-opportunity"
              @click="spitThumb(index)"
              v-if="spit.isThumb"
              style="font-size:0.9em;"
            >赞&nbsp;{{spit.thumbs}}</el-button>

            <el-button
              type="text"
              icon="el-icon-s-opportunity"
              @click="spitThumb(index)"
              style="font-size:0.9em;color:rgb(95, 95, 80)"
              v-else
            >赞&nbsp;{{spit.thumbs}}</el-button>
            <el-button
              type="text"
              :icon="spit.commentIcon"
              @click="spit.noMoreComment = false;listComment(index);"
            >展开评论列表</el-button>
            <el-button type="text" icon="el-icon-chat-line-round" @click="comment(index)">评论</el-button>
          </div>
        </div>
        <div class="spit-comment-container" v-if="spit.listComment">
          <div v-if="spit.commentNum>0">
            <div v-for="(spitComment,commentIndex) in spit.comments" :key="spitComment.id">
              <div class="spit-comment">
                <div class="spit-comment-header">
                  <el-avatar :size="25" :src="spitComment.userAvatar"></el-avatar>
                  <span>{{spitComment.userNickname}}</span>
                  <div v-if="spitComment.replyId!=0" class="comment-reply">
                    <span class="comment-reply-text">回复</span>
                    <span>{{spitComment.replyUserNickname}}</span>
                  </div>
                </div>
                <div class="spit-comment-content">{{spitComment.content}}</div>
                <div class="spit-comment-bottom">
                  <div class="publish-date">发表时间: {{spitComment.createTime}}</div>

                  <el-button
                    type="text"
                    icon="el-icon-s-opportunity"
                    @click="spitCommentThumb(index,commentIndex)"
                    v-if="spitComment.isThumb"
                    style="font-size:0.7em;"
                  >赞&nbsp;{{spitComment.thumbs}}</el-button>

                  <el-button
                    type="text"
                    icon="el-icon-s-opportunity"
                    @click="spitCommentThumb(index,commentIndex)"
                    style="font-size:0.7em;color:rgb(95, 95, 80)"
                    v-else
                  >赞&nbsp;{{spitComment.thumbs}}</el-button>

                  <el-button
                    type="text"
                    icon="el-icon-chat-line-round"
                    @click="comment(index,commentIndex)"
                  >回复</el-button>
                </div>
              </div>
              <el-divider class="divider" v-if="commentIndex!=spit.comments.length-1"></el-divider>
            </div>
            <div v-if="spit.noMoreComment" class="spit-no-more-comment">没有更多了</div>
            <div v-else @click="loadMoreComment(index)" class="load-more-comment">加载更多..</div>
          </div>
          <div v-else class="spit-no-comment">现在还没有评论哦 ~</div>
        </div>
        <!-- 加下边距用的空div -->
        <div style="height:10px" v-if="spit.listComment"></div>
      </Card>
    </div>
    <div class="spit-index-right"></div>
    <el-drawer :visible.sync="commentDrawer" :direction="direction">
      <template #title>
        <div>{{drawerTitle}}</div>
      </template>
      <template #default>
        <div class="new-spit-comment-input-content">
          <el-form :model="commentModel" :rules="commentRules" ref="commentForm">
            <el-form-item :label="`内容`" prop="content">
              <el-input type="textarea" v-model="commentModel.content" :rows="4" ref="con"></el-input>
            </el-form-item>
          </el-form>
          <div class="new-spit-comment-input-footer">
            <el-button @click="commentDrawer=false">取 消</el-button>
            <el-button
              @click="pushComment('commentForm')"
              type="primary"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import Card from "~/components/Card.vue";
import spitApi from "~/api/spit";
export default {
  async asyncData({ route }) {
    //   console.log(route.query.tags);
    let res = await spitApi.getSpit(1, 5);
    if (res.code == 15000) {
      return {
        spits: res.data.items
      };
    }
  },
  mounted() {
    for (var i in this.spits) {
      let spit = this.spits[i];
      spit.commentIcon = "el-icon-arrow-up";
      spit.comments = [];
      this.$set(this.spits, i, spit);
    }

    var _self = this;
    window.addEventListener("scroll", function(e) {
      let sy = window.scrollY;
      let sh = document.documentElement.scrollHeight;
      let ch = document.documentElement.clientHeight;
      if (sy == sh - ch && _self.loading && !_self.noMore) {
        window.scrollBy(0, -500);
      }
      if (sy >= sh - ch - 300) {
        // console.log(`mounted------ loading:${_self.loading} , noMore:${_self.noMore}`);
        if (!_self.loading && !_self.noMore) {
          // console.log(`mounted2------ loading:${_self.loading} , noMore:${_self.noMore}`);
          _self.loading = true;
          _self.loadMore();
        }
      }
    });
  },
  methods: {
    async loadMore() {
      let res = await spitApi.getSpit(this.page, this.pageSize);
      if (res) {
        this.loading = false;
        if (res.data.size == 0) {
          this.noMore = true;
          return;
        }
        let newSpit=res.data.items;
         for (var i in newSpit) {
          let spit = newSpit[i];
          spit.commentIcon = "el-icon-arrow-up";
          spit.comments = [];
        }
        this.spits = this.spits.concat(newSpit);
        this.page++;
      }
    },
    async spitThumb(index) {
      let spit = this.spits[index];
      let res;
      if (!spit.isThumb) {
        res = await spitApi.spitThumb(spit.id);
        if (res.code == 15000) {
          spit.isThumb = true;
          spit.thumbs++;
          this.$set(this.spits, index, spit);
        }
      } else {
        res = await spitApi.spitUnthumb(spit.id);
        if (res.code == 15000) {
          spit.isThumb = false;
          spit.thumbs--;
          this.$set(this.spits, index, spit);
        }
      }
    },
    async spitCommentThumb(index, commentIndex) {
      let spit = this.spits[index];
      let comment = spit.comments[commentIndex];
      let res;
      if (!comment.isThumb) {
        res = await spitApi.spitCommentThumb(comment._id);
        if (res.code == 15000) {
          comment.isThumb = true;
          comment.thumbs++;
        }
      } else {
        res = await spitApi.spitCommentUnthumb(comment._id);
        if (res.code == 15000) {
          comment.isThumb = false;
          comment.thumbs--;
        }
      }
      this.$set(this.spits, index, spit);
    },
    async listComment(index) {
      console.log(`index : ${index}`);
      let spit = this.spits[index];
      console.log(`spit : ${spit}`);
      console.log(spit);
      //展开评论列表
      if (!spit.listComment) {
        spit.listComment = true;
        spit.commentIcon = "el-icon-arrow-down";
        spit.commentPage = 1;
        spit.commentSize = 5;

        let res = await spitApi.getSpitComments(
          spit.commentPage,
          spit.commentSize
        );
        if (res.code == 15000) {
          spit.comments = spit.comments.concat(res.data.items);
          if (res.data.size == 0) spit.noMoreComment = true;
          else spit.noMoreComment = false;
        }
      }
      //关闭评论列表
      else {
        spit.listComment = false;
        spit.comments = [];
        spit.noMoreComment = false;
        spit.commentIcon = "el-icon-arrow-up";
      }
      this.$set(this.spits, index, spit);
    },
    async loadMoreComment(index) {
      console.log(index);
      let spit = this.spits[index];
      let res = await spitApi.getSpitComments(
        ++spit.commentPage,
        spit.commentSize
      );
      if (res.code == 15000) {
        spit.comments = spit.comments.concat(res.data.items);
        if (res.data.size == 0) spit.noMoreComment = true;
      }
      this.$set(this.spits, index, spit);
    },
    comment(index, commentIndex) {
      console.log(`index : ${index} , commentIndex : ${commentIndex}`);
      let si = this.commentModel.spitIndex;
      let ci = this.commentModel.commentIndex;
      try {
        this.commentModel.spitIndex = index;
        this.commentModel.commentIndex = commentIndex;
        this.commentDrawer = true;
      } catch (e) {
        this.commentModel.spitIndex = si;
        this.commentModel.commentIndex = ci;
        this.commentDrawer = false;
      }
    },
    pushComment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let spitIndex = this.commentModel.spitIndex;
          let commentIndex = this.commentModel.commentIndex;
          let content = this.commentModel.content;
          this.publishComment(spitIndex, commentIndex, content);
        }
      });
    },
    async publishComment(spitIndex, commentIndex, content) {
      let spit = this.spits[spitIndex];
      let res;
      if (commentIndex == undefined) {
        res = await spitApi.publishComment(spit.id, null, content);
      } else {
        let comment = spit.comments[commentIndex];
        res = await spitApi.publishComment(spit.id, comment.id, content);
      }
      if (res.code == 15000) {
        this.$message({
          type: "success",
          message: "评论成功"
        });
        this.commentDrawer = false;
        this.commentModel.content = "";
        let comment = res.data;
        spit.comments.unshift(comment);
        spit.commentNum++;
        spit.listComment = true;
        this.$set(this.spits, spitIndex, spit);
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.firstChild.focus();
      }
    }
  },
  data() {
    return {
      spits: [],
      //无限滚动变量
      page: 2,
      pageSize: 5,
      load: false,
      noMore: false,
      loading: false,
      commentDrawer: false,
      direction: "rtl",
      commentModel: {
        //要发表的评论所在吐槽的索引号
        spitIndex: 0,
        //要回复评论的索引号，根评论为undefined
        commentIndex: undefined,
        content: ""
      },
      commentRules: {
        content: [
          { required: true, message: "评论内容不能为空", trigger: "blur" },
          { min: 1, max: 40, message: "内容太长了", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Card
  },
  computed: {
    drawerTitle: function() {
      let spitIndex = this.commentModel.spitIndex;
      let commentIndex = this.commentModel.commentIndex;
      if (commentIndex == undefined) {
        let spit = this.spits[spitIndex];
        let nickname = spit.userNickname;
        return `评论@${nickname}`;
      } else {
        let spit = this.spits[spitIndex];
        let comment = spit.comments[commentIndex];
        let nickname = comment.userNickname;
        return `回复@${nickname}`;
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "~/assets/css/common";
$min-height: 50vh;
.spit-index {
  min-height: $min-height;
  width: 90%;
  @include box;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0px;
}
.spit-index-left {
  width: 70%;
}

.spit-index-right {
  width: 25%;
  min-height: $min-height;
  @include box;
}
.spit-index-card {
  padding: 10px 20px 0px 20px;
  margin-bottom: 10px;
  .spit-index-info {
    display: flex;
    position: relative;
    align-items: center;
    .spit-index-tags {
      position: absolute;
      right: 10px;
      .tag {
        margin-left: 5px;
      }
    }
  }
  .t1 {
    color: #132519;
    font-size: 1.3em;
    margin: 4px 0px;
  }
  .t2 {
    color: #6c6d3c;
    font-size: 1em;
    margin: 4px 0px;
  }
  .cont {
    color: #3b0750;
    font-size: 0.9em;
    text-indent: 1em;
  }
  .spit-index-inner-card {
    min-height: 150px;
    .spit-index-card-bottom {
      display: flex;
      justify-content: flex-end;
      font-size: 1.2em;
      width: 98%;
      position: relative;
      bottom: 5px;
      .publish-date {
        position: absolute;
        font-size: 0.67em;
        left: 10px;
        bottom: 15px;
        color: #868383;
      }
    }
  }

  .spit-comment-container {
    // min-height: 540px;
    @include box;
    box-shadow: 0 0;
    padding: 10px 5px;
    .spit-comment {
      padding: 0px 5px;
      min-height: 70px;
      .spit-comment-header {
        color: #6c6d3c;
        display: flex;
        align-items: center;
        height: 27px;
        span {
          margin-left: 10px;
        }
        .comment-reply {
          .comment-reply-text {
            color: #3f64e8;
            font-size: 0.9em;
          }
        }
      }
      .spit-comment-content {
        text-indent: 2em;
        margin-top: 10px;
        font-size: 0.9em;
        min-height: 43px;
        max-height: 300px;
      }
      .spit-comment-bottom {
        height: 30px;
        display: flex;
        justify-content: flex-end;
        font-size: 1.2em;
        width: 98%;
        position: relative;
        bottom: 5px;
        .publish-date {
          position: absolute;
          font-size: 0.67em;
          left: 10px;
          bottom: 2px;
          color: #868383;
        }
      }
    }
    hr {
      color: rebeccapurple;
      margin: 0 5px;
    }
    .divider {
      background: #a09c92;
      margin: 5px 0px;
    }
    .spit-no-comment {
      text-align: center;
      color: #211e56;
      padding: 3px 0px;
      border: 1px #a09c92 dashed;
    }
    .load-more-comment {
      text-align: center;
      color: #211e56;
      cursor: pointer;
      padding: 3px 0px;
      border: 1px #a09c92 dashed;
      transition: background-color 200ms ease-in 50ms;
      &:hover {
        background-color: #4cc52e63;
      }
    }
    .spit-no-more-comment {
      text-align: center;
      color: #211e56;
      padding: 3px 0px;
      border: 1px #a09c92 dashed;
    }
  }
}

.new-spit-comment-input-content {
  padding: 5px 20px;

  .new-spit-comment-input-footer {
    // position: absolute;
    // width: 90%;
    // bottom: 10px;
    display: flex;
    justify-content: space-between;
    button {
      width: 45%;
    }
  }
}
</style>