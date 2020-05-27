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
      <el-table-column prop="address" width="300">
        <template slot-scope="scope">
            <el-button v-if="isDate(scope.$index)" type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import userApi from "~/api/user";
export default {
  async asyncData() {
    console.log("ss");
    let res = await userApi.getInfo();
    console.log(res);
    if (res.code == 15000) {
      return {
        user: res.data
      };
    }
  },
  data() {
    return {
      user: {},
      tableData: [
        {
          label: "用户名",
          prop: "username"
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
      ]
    };
  },
  methods: {
    info(index) {
      let ok = this.tableData[index].prop;
      return this.user[ok];
    },
    isDate(index){
        console.log(index);
        if(index!=3)
            return true;
        return false;
    }
  },
  computed: {}
};
// "roles": "管理员",
// "privileges": "即传斗第给技般",
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
</style>