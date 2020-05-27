<template>
  <div class="container" style="padding:20px">
    <div class="top">
      <div class="top-left">
        <el-avatar :src="user.avatar" :size="100"></el-avatar>
        <span class="nickname">{{user.nickname}}</span>
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
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#11111100"
      text-color="#303133"
      active-text-color="#409eff"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/user/detail">个人信息</el-menu-item>
      <el-menu-item index="/user/detail/privilege">拥有特权</el-menu-item>
      <el-menu-item index="/user/detail/message">我的消息</el-menu-item>
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
      user:result
    };
  },
  data() {
    return {
      user: {},
      activeIndex: "/user/detail"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
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
  //   .top-info {
  //     margin-left: 20px;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     font-size: 1.3em;
  //   }
  .nickname {
    margin-left: 20px;
    font-size: 1.4em;
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
</style>
