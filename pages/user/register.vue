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
        <el-form-item label="手机号" maxlength="11" class="input" prop="phone">
          <el-input placeholder="手机号" v-model="user.phone"></el-input>
        </el-form-item>

        <el-form-item label="密码" class="input" prop="password">
          <el-input placeholder="请输入密码" show-password v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" class="input" prop="repPassword">
          <el-input placeholder="请输入密码" show-password v-model="user.repPassword"></el-input>
        </el-form-item>

        <el-form-item label="验证码" class="input" prop="code">
          <div class="code">
            <el-input v-model="user.code" maxlength="6" style="display:inline-block"></el-input>
            <el-button
              style="margin-left:10px"
              @click="sendMsg"
              :disabled="sendButtonStatus"
            >{{sendCodeText}}</el-button>
          </div>
        </el-form-item>
        <div class="buttons">
          <el-button type="primary" @click="registerClick" :loading="loading">{{loading?"加载中":"注册"}}</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.repPassword !== "") {
          this.$refs.ruleForm.validateField("repPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        phone: "",
        password: "",
        repPassword: "",
        code: ""
      },
      loading:false,
      sendCodeText: "发送",
      sendButtonStatus: false,
      rules: {
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: "请输入正确的手机号",
            trigger: ["change", "blur"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        repPassword: [{ validator: validatePass2, trigger: "change" }],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: ["blur", "change"]
          },
          { len: 6, message: "请输入正确的验证码", trigger: ["blur"] }
        ]
      }
    };
  },
  methods: {
    registerClick() {
      this.$refs["ruleForm"].validate(vaild => {
        if (vaild) {
          this.register();
        } else {
          this.$message({
            message: "请填入必要信息",
            type: "error"
          });
        }
      });
    },
    async register() {
      this.loading=true;
      let u=this.user;
      let res = await userApi.register(u.phone,u.password,u.code);
      if (res.code == 15000) {
  
        this.$message({
          message: "注册成功",
          type: "success"
        });
      }
      this.loading=false;
    },
    async sendMsg() {
      let phone = this.user.phone;
      let rex = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (rex.test(phone)) {
        let res = await userApi.sendRegisterCode(phone);
        if (res) {
          this.$message({
            type: "success",
            message: res.message
          });
          let _self = this;
          let time = 60;
          //立即执行一次
          _self.sendCodeText = `${time}s`;
          _self.sendButtonStatus = true;
          //周期倒计时
          let inter = setInterval(() => {
            time--;
            _self.sendCodeText = `${time}s`;
            _self.sendButtonStatus = true;
          }, 1000);
          //time秒后取消
          setTimeout(() => {
            console.log(` setTimeout: ${time}s`);
            _self.sendCodeText = "发送";
            _self.sendButtonStatus = false;
            clearInterval(inter);
          }, time * 1000);
        }
      } else {
        this.$message({
          type: "warning",
          message: "请输入正确的手机号码"
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
.code {
  display: flex;
  justify-content: space-between;
}
.buttons {
  margin: {
    top: $form * 0.1;
  }
  display: flex;
  justify-content: space-around;
}
</style>