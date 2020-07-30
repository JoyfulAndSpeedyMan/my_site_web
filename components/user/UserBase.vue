<template>
  <div class="user" v-if="user">
    <div class="container2">
      <el-avatar shape="square" :size="size" :src="user.avatar" :key="user.avatar"></el-avatar>
      <div class="flex">
        <el-button type="text" @click="userInfo">{{user.nickname}}</el-button>
        <el-dropdown>
          <el-badge :is-dot="hasMsg" class="item" type="warning">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>更多
            </span>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="change">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="notice" style="height:35px">
              通知
              <el-badge v-if="user.msgUnreadNum" :value="user.msgUnreadNum" :max="10">
                <i class="el-icon-message-solid"></i>
              </el-badge>
              <i class="el-icon-message-solid" v-else></i>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
  <div class="user" v-else>
    <div class="userBase-entry">
      <nuxt-link :to="{ path: '/user/login', query: { back: $route.path }}" class="text-button">登录</nuxt-link>
      <nuxt-link
        :to="{ path: '/user/register', query: { back: $route.path }}"
        class="text-button"
      >注册</nuxt-link>
    </div>
  </div>
</template>

<script>
import auth from "~/utils/auth";
import userApi from "~/api/user";
import { mapMutations } from "vuex";
export default {
  async mounted() {
    if (auth.getToken() != undefined) {
      let res = await userApi.getBaseInfo();
      if (res.code != 15000) {
        auth.logout();
        this.user = null;
      } else {
        this.user = res.data;
        auth.saveUserInfo(this.user);
      }
    }
  },
  data() {
    return {
      user: null,
      size: 70
    };
  },
  methods: {
    userInfo() {
      this.$router.push("/user/detail");
    },
    change() {
      this.openPasswordDrawer();
      this.$router.push("/user/detail");
    },
    notice() {
      this.$router.push("/user/detail/message");
    },
    logout() {
      auth.logout();
      this.user = null;
      this.$message({
        type: "success",
        message: "退出成功"
      });
    },
    ...mapMutations("user", ["openPasswordDrawer", "closePasswordDrawer"])
  },
  computed: {
    hasMsg() {
      if (this.user.urMsgNum) {
        return true;
      }
      return false;
    }
  },
  watch: {
    $route: async function() {
      console.log("刷新");
      if (auth.getToken() != undefined) {
        let res = await userApi.getBaseInfo();
        if (res.code != 15000) {
          auth.logout();
          this.user = null;
          return;
        } else {
          this.user = res.data;
          auth.saveUserInfo(this.user);
        }
      } else {
        this.user = null;
      }
    }
  }
};
</script>

<style lang="scss">
$height: 10vh;
.userBase-entry {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 200px;
}
.flex {
  margin-left: 1vw;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
}
.container {
  margin: {
    top: $height/2.5;
    right: 2em;
  }
}
.container2 {
  margin-top: 1.3vh;
  margin-right: 2vw;
}
.user {
  // background: rgb(59, 230, 116);
  height: $height;
  display: inline-block;
  float: right;
}
.text-button {
  font-size: 1.4em;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>