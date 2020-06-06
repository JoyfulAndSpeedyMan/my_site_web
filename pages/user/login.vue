<template>
  <div class="con">
    <div class="wrapper-center">
      <el-form
        label-width="80px"
        class="form"
        :model="user"
        :rules="rules"
        ref="ruleForm"
        status-icon
      >
        <el-form-item label="用户名" class="input" prop="username">
          <el-input placeholder="请输入用户名/邮箱/手机号" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="input" prop="password">
          <el-input placeholder="请输入密码" show-password v-model="user.password"></el-input>
        </el-form-item>
        <div class="buttons">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="primary" @click="loginClick('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import userApi from "~/api/user";
import auth from "~/utils/auth";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { required: true, message: "用户名不能为空", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { required: true, message: "密码不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    register() {
      this.$router.push("/user/register")
    },
    loginClick(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$message({
            message: "请填入必要信息",
            type: "error"
          });
        }
      });
    },
    async login() {
      let res = await userApi.login(this.user);
      if (res.data.token) {
        let user = auth.getUserInfoAndSaveToken(res.data.token);
        let backUrl=this.$route.query.back;
        console.log(backUrl);
        if(backUrl!=null){
          if(backUrl.startsWith('/'))
            this.$router.replace(backUrl);
          else
            window.location.href=backUrl;
        }
        else
          this.$router.replace('/');
        this.$message({
          message: `欢迎回来`,
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/css/common";
.wrapper-center {
  position: absolute;
  top: 50%;
  left: 50%;
}
$form: $main-width * 0.25;
.form {
  transform: translate(-50%, -50%);
  @include box;
  padding: $form * 0.15;
  width: $form;
}
.input {
  margin: {
    top: $form * 0.1;
  }
}
.buttons {
  margin: {
    top: $form * 0.1;
  }
  display: flex;
  justify-content: space-around;
}
</style>