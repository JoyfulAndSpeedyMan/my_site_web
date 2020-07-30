<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-class-name="row"
      cell-class-name="row-cell"
      header-row-class-name="th"
      header-cell-class-name="th-cell"
      :show-header="false"
    >
      <el-table-column prop="label" width="180"></el-table-column>
      <el-table-column prop="name">
        <template slot-scope="scope">{{info(scope.$index)}}</template>
      </el-table-column>
      <el-table-column width="300">
        <template slot-scope="scope">
          <el-button
            v-if="isShowButton(scope.$index)"
            type="text"
            @click="handleButton(scope.$index)"
          >{{buttonText(scope.$index)}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改密码Drawer -->
    <el-drawer :visible.sync="passwordDrawer" direction="rtl">
      <template #title>
        <div>修改密码</div>
      </template>
      <template #default>
        <div class="drawer-content">
          <el-form :model="passwordModel" :rules="passwordModel.rules" ref="passwordForm">
            <el-form-item label-width="100px" :label="`新密码`" prop="password">
              <el-input
                v-model="passwordModel.password"
                show-password
                maxlength="18"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label-width="100px" :label="`确认密码`" prop="repPassword">
              <el-input
                v-model="passwordModel.repPassword"
                show-password
                maxlength="18"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="手机号" maxlength="11" class="input" prop="phone">
              <el-input v-model="user.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="验证码" class="input" prop="code">
              <div class="code">
                <el-input v-model="passwordModel.code" maxlength="6"></el-input>
                <el-button
                  style="margin-left:10px"
                  @click="sendChangeMsgCode('password')"
                  :disabled="!passwordModel.sendButtonStatus"
                >{{passwordModel.sendCodeText}}</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="drawer-content-input-footer">
            <el-button @click="spitDrawer=false">取 消</el-button>
            <el-button
              @click="HandlePasswordSubmit"
              type="primary"
            >{{ passwordModel.submitLoading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
    <!-- 修改用户名Drawer -->
    <el-drawer :visible.sync="usernameDrawer" direction="rtl">
      <template #title>
        <div>修改用户名</div>
      </template>
      <template #default>
        <div class="drawer-content">
          <el-form :model="usernameModel" :rules="usernameModel.rules" ref="usernameForm">
            <el-form-item label-width="4em" :label="`用户名`" prop="password">
              <el-input v-model="usernameModel.username" maxlength="18" show-word-limit></el-input>
            </el-form-item>
          </el-form>
          <div class="drawer-content-input-footer">
            <el-button @click="spitDrawer=false">取 消</el-button>
            <el-button
              @click="HandleUsernameSubmit"
              type="primary"
            >{{ usernameModel.submitLoading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import userApi from "~/api/user";
import auth from "~/utils/auth";
import { mapMutations } from "vuex";
export default {
  async asyncData() {
    let res = await userApi.getInfo();
    if (res.code == 15000) {
      return {
        user: res.data
      };
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordModel.repPassword !== "") {
          this.$refs.passwordForm.validateField("repPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordModel.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      tableData: [
        {
          label: "用户名",
          prop: "username"
        },
        {
          label: "密码",
          prop: "password"
        },
        {
          label: "电话号码：",
          prop: "phone"
        },
        {
          label: "邮箱",
          prop: "email"
        },
        {
          label: "账户创建日期",
          prop: "createTime"
        }
      ],
      // passwordDrawer: false,
      passwordModel: {
        password: "",
        repPassword: "",
        submitLoading: false,
        sendButtonStatus: true,
        sendButtonLoading: false,
        sendCodeText: "发送",
        rules: {
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
      },
      usernameModel: {
        username: "",
        rules: {
          username: [
            {
              required: true,
              message: "用户名不能为空",
              trigger: ["blur", "change"]
            },
            {
              min: 1,
              max: 18,
              message: "用户名长度必须为1-18个字符",
              trigger: ["change"]
            }
          ]
        }
      }
    };
  },
  methods: {
    firstToUpperCase(s) {
      return s.slice(0, 1).toUpperCase() + s.slice(1);
    },
    isBlank(s){
      if(s == null || s.trim().length == 0)
        return true;
      return false;
    },
    info(index) {
      let row = this.tableData[index];
      let prop = row.prop;
      if(prop=="password")
        return "*******";
      if (this.isBlank(this.user[prop]))
        return "未设置";
      let ok = this.tableData[index].prop;
      return this.user[ok];
    },
    isShowButton(index) {
      if (this.tableData[index].prop == "createTime") return false;
      return true;
    },
    buttonText(index) {
      let prop = this.tableData[index].prop;
      if (
        prop == "username" &&
        (this.user["username"] == null ||
          this.user["username"].trim().length == 0)
      )
        return "设置";
      if (prop == "password" || prop == "username") return "修改";
      let p = this.user[prop];
      if (p) return "修改";
      else return "绑定";
    },
    handleButton(index) {
      let prop = this.tableData[index].prop;
      if(prop=="email" || prop=="phone"){
        this.$message("暂未开发");
        return;
      }
      let p = `open${this.firstToUpperCase(prop)}Drawer`;
      console.log(p);
      this[p]();
    },
    HandlePasswordSubmit() {
      let form = this.$refs["passwordForm"];
      let that = this;
      form.validate(async function(vaild) {
        if (vaild) {
          that.passwordModel.submitLoading = true;
          let res = await userApi.changePassword(
            that.passwordModel.password,
            that.passwordModel.code
          );
          that.passwordModel.submitLoading = false;
          if (res.code == 15000) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
            that.passwordDrawer = false;
            that.passwordModel.oldPassword = null;
            that.passwordModel.password = null;
            that.passwordModel.repPassword = null;
            auth.logout();
            auth.toLogin(that.$router, that.$route);
          }
        }
      });
    },
    HandleUsernameSubmit() {
      let form = this.$refs["usernameForm"];
      let that = this;
      form.validate(async function(vaild) {
        if (vaild) {
          let model = that.usernameModel;
          model.submitLoading = true;
          let res = await userApi.changeUsername(model.username);
          model.submitLoading = false;
          if (res.code == 15000) {
            that.$message({
              type: "success",
              message: "修改成功"
            });
            that.closeUsernameDrawer();
            that.$set(thauser,'username',model.username)
            model.username = null;
            
          }
        }
      });
    },
    async sendChangeMsgCode(target) {
      let modelName = target + "Model";
      // 1
      let model = this[modelName];
      model.sendButtonLoading = true;
      let apiName = `sendChange${this.firstToUpperCase(target)}Code`;
      // 2
      let res = await userApi[apiName](this.user.phone);
      if (res.code == 15000) {
        model.sendButtonLoading = false;
        this.$message({
          type: "success",
          message: res.message
        });
        let time = 60;
        //立即执行一次
        this.$set(model, "sendCodeText", `${time}s`);
        this.$set(model, "sendButtonStatus", false);
        //周期倒计时
        let inter = setInterval(() => {
          time--;
          this.$set(model, "sendCodeText", `${time}s`);
          this.$set(model, "sendButtonStatus", false);
        }, 1000);
        //time秒后取消
        setTimeout(() => {
          this.$set(model, "sendCodeText", "发送");
          this.$set(model, "sendButtonStatus", true);
          clearInterval(inter);
        }, time * 1000);
      }
    },
    //映射状态操作
    ...mapMutations("user", [
      "openPasswordDrawer",
      "closePasswordDrawer",
      "openUsernameDrawer",
      "closeUsernameDrawer"
    ])
  },
  computed: {
    passwordDrawer: {
      get() {
        return this.$store.state.user.passwordDrawer;
      },
      set(value) {
        if (value) this.openPasswordDrawer();
        else this.closePasswordDrawer();
      }
    },
    usernameDrawer: {
      get() {
        return this.$store.state.user.usernameDrawer;
      },
      set(value) {
        if (value) this.openUsernameDrawer();
        else this.closeUsernameDrawer();
      }
    }
  }
};
</script>
<style  lang="scss" >
@import "~/assets/css/common";
.el-table {
  font-size: 1.1em;
  color: rgb(39, 28, 28);
  @include box;
  margin: {
    top: 1vh;
  }
  background: rgba(255, 255, 255, 0);
  .row {
    background: rgba(255, 255, 255, 0.6);
  }
  .row-cell {
    background: rgba(255, 255, 255, 0);
  }
  .th {
    background: rgba(0, 0, 0, 0.7);
  }
  .th-cell {
    background: rgba(0, 0, 0, 0);
  }
}
.drawer-content {
  padding: 5px 20px;

  .drawer-content-input-footer {
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
.code {
  display: flex;
  justify-content: space-between;
}
</style>