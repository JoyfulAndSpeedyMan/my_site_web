<template>
  <div class="container" style="padding:20px">
    <div class="top">
      <div class="top-left">
        <el-avatar :src="user.avatar" :size="100"></el-avatar>
        <span class="nickname" @click="editNickname">
          <el-input
            @blur="editNicknameDone"
            @keypress.enter.native="editNicknameDone"
            ref="inputNickname"
            v-if="editingNickname"
            v-model="editingNicknameModel"
            style="display: inline-block;width: 10em;"
          ></el-input>

          <span v-else>{{user.nickname}}</span>
          <i class="el-icon-edit" style="font-size: 0.8em;color: #a5157f;"></i>
        </span>
      </div>
      <div class="top-right">
        <el-button type="primary">保存</el-button>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="编辑我的简介"
          v-model="user.resume"
          clearable
          style="margin-top:5px"
        ></el-input>
      </div>
    </div>

    <el-divider></el-divider>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#11111100"
      text-color="#303133"
      active-text-color="#409eff"
      router
    >
      <el-menu-item index="/user/detail">个人信息</el-menu-item>
      <el-menu-item index="/user/detail/privilege">拥有特权</el-menu-item>
      <el-menu-item index="/user/detail/message">
        我的消息
        <span class="reddot" v-if="user.msgUnreadNum">•</span>
      </el-menu-item>
    </el-menu>
    <nuxt />
    <el-divider></el-divider>
  </div>
</template>

<script>
import auth from "~/utils/auth";
import userApi from "~/api/user";
export default {
  async asyncData(context) {
    let result;
    if (process.client) {
      let user = auth.getUserInfo();
      if (user != null) {
        result = user;
      }
    } else {
      let res = await userApi.getBaseInfo();
      if (res.code == 15000) result = res.data;
    }

    return {
      user: result,
      editingNicknameModel: result.nickname
    };
  },
  updated() {
    if (this.editingNickname) this.$refs["inputNickname"].focus();
  },
  data() {
    return {
      user: {},
      editingNickname: false,
      editingNicknameModel: ""
      // activeIndex: "/user/detail"
    };
  },
  methods: {
    editNickname() {
      this.editingNickname = true;
    },
    async editNicknameDone() {
      this.editingNickname = false;
      if (this.editingNicknameModel != this.user.nickname) {
        let res = await userApi.changeNickname(this.editingNicknameModel);
        if (res.code == 15000) {
          this.$set(this.user, "nickname", this.editingNicknameModel);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/common";

.top {
  display: flex;
  justify-content: space-between;
  .top-left {
    display: inline-flex;
    align-items: center;
  }
  .nickname {
    margin-left: 20px;
    font-size: 1.4em;
    cursor: pointer;
  }
  .top-right {
    font-size: 1.3em;
    width: 30%;
  }
}
// 分割线的颜色设置
.el-divider {
  background: #b16666;
}
.reddot {
  display: inline-block;

  color: red;
  font-size: 1.7em;
  transform: translate(2px, -10px);
}
</style>
