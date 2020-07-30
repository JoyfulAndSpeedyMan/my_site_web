<template>
  <div class="con-video">
    <span class="title">免费视频网站列表</span>
    <div class="tool-bar">
      <el-button type="primary" icon="el-icon-refresh" @click.native="refresh">刷新网站列表</el-button>
      <el-button type="success" icon="el-icon-share" @click.native="shareOpen">分享我知道的小网站</el-button>
      <!-- <el-button type="info" icon="el-icon-mouse" @click.native="spit">吐槽</el-button> -->
    </div>

    <el-table
      :cell-class-name="tableRowCellStyle"
      :row-class-name="tableRowStyle"
      header-row-class-name="th"
      header-cell-class-name="th-cell"
      :data="tableData"
      :v-loading="load"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="image" label="缩略图">
        <template slot-scope="scope">
          <el-image fit="fill" :src="scope.row.image" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="网站名称" sortable>
        <template slot-scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="网站地址" sortable>
        <template slot-scope="scope" class="tag">
          <a :href="scope.row.url" target="_blank">网站链接</a>
        </template>
      </el-table-column>
      <el-table-column prop="kind" label="分类" sortable></el-table-column>
      <el-table-column prop="detail" label="描述" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable width="100" :formatter="formatter"></el-table-column>
      <el-table-column prop="thumbs" label="点赞" sortable width="100">
        <template slot-scope="scope" class="tag">
          <div @click="thumb(scope.$index)" style="cursor: pointer;">
            <i
              class="el-icon-s-opportunity"
              style="font-size:1.5em;color:#409EFF;"
              v-if="scope.row.isThumb"
            ></i>
            <i class="el-icon-s-opportunity" style="font-size:1.5em;color:rgb(95, 95, 80)" v-else></i>
            {{scope.row.thumbs}}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <h1 v-if="loading" v-loading="loading" class="mes">正在加载</h1>
    <h1 v-if="noMore" class="mes">没有更多了</h1>

    <el-dialog title="分享网站" :visible.sync="share.dialogVisible" width="40%">
      <el-form
        label-width="80px"
        :model="share.form"
        :rules="share.rules"
        ref="shareForm"
        status-icon
      >
        <el-form-item label="网站名称" class="input" prop="name">
          <el-input placeholder="请输入网站名称" v-model="share.form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="网址" class="input" prop="url">
          <el-input placeholder="请输入网址" v-model="share.form.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类" class="input" prop="kind">
          <el-select v-model="share.form.kind" placeholder="请选择" filterable clearable>
            <el-option v-for="item in share.kinds" :key="item.id" :value="item.kindName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" class="input" prop="detail" clearable>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 7}"
            placeholder="请输入内容"
            v-model="share.form.detail"
          ></el-input>
        </el-form-item>

        <div class="buttons">
          <el-button type="primary" @click="share.dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="shareClick">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import freevideoApi from "~/api/freevideo";
import { Message } from "element-ui";
import auth from "~/utils/auth";
export default {
  async asyncData() {
    let result = {};
    let res = await freevideoApi.getList(1, 10);
    console.log(res);
    if (res.data.size == 0) {
      result.noMore = true;
      Message({
        message: "没有网站信息",
        type: "warning"
      });
    }
    result.tableData = res.data.items;
    return result;
  },
  mounted() {
    var _self = this;
    window.addEventListener("scroll", function(e) {
      let sy = window.scrollY;
      let sh = document.documentElement.scrollHeight;
      let ch = document.documentElement.clientHeight;
      // console.log(
      //   `scrollY = ${sy} , scrollHeight = ${sh}, clientHeight = ${ch}`
      // );
      // console.log(
      //   `------ scrollHeight-clientHeight = ${sh -ch}`
      // );
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
  data() {
    return {
      load: false,
      noMore: false,
      loading: false,
      tableData: [],
      baseSize: 50,
      page: 2,
      size: 10,
      share: {
        dialogVisible: false,
        form: {},
        kinds: [],
        rules: {
          name: [
            { required: true, message: "网站名称不能为空", trigger: "blur" },
            {
              min: 1,
              max: 20,
              message: "长度不能大于15个字符",
              trigger: ["change", "blur"]
            }
          ],
          url: [
            { required: true, message: "网址是必须的", trigger: "blur" },
            {
              pattern:/^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/,
              message: "请输入正确的网址",
              trigger: ["change", "blur"]
            }
          ],
          kind: [{ required: true, message: "请选择分类", trigger: "blur" }]
        }
      }
    };
  },
  methods: {
    async loadMore() {
      // console.log(
      //   `loadMore------ loading:${this.loading} , noMore:${this.noMore}`
      // );
      let res = await freevideoApi.getList(this.page, this.size);
      if (res) {
        this.loading = false;
        if (res.data.size == 0) {
          this.noMore = true;
          return;
        }
        this.tableData = this.tableData.concat(res.data.items);
        this.page++;
      }
    },
    async thumb(index) {
      let id = this.tableData[index].id;
      if (auth.getToken()) {
        //点赞
        if (!this.tableData[index].isThumb) {
          let res = await freevideoApi.thumb(id);
          if (res.code == 15000) {
            this.tableData[index].thumbs++;
            this.tableData[index].isThumb = true;
          }
        }
        //取消点赞
        else {
          let res = await freevideoApi.unthumb(id);
          if (res.code == 15000) {
            this.tableData[index].thumbs--;
            this.tableData[index].isThumb = false;
          }
        }
      } else {
        auth.toLogin(that.$router, that.$route);
      }
    },
    async refresh() {
      this.load = true;
      this.page = 1;
      this.loading = true;
      this.noMore = false;
      let res = await freevideoApi.getList(1, this.size);
      console.log(res);
      if (res) {
        this.loading = false;

        if (res.data.size == 0) {
          this.noMore = true;
          this.$message({
            message: "没有网站信息",
            type: "warning"
          });
        }
        else{
          this.tableData = res.data.items;
          this.load = false;
          this.$message({
            message: "刷新成功",
            type: "success"
          });
       }
      }
    },
    formatter(row, column) {
      let s = "";
      switch (row.status) {
        case 1:
          s = "可用";
          break;
        case 0:
          s = "不可用";
          break;
      }
      return s;
    },
    tableRowStyle({ row, rowIndex }) {
      if (row.status == 1) return "row";
      else return "row-disable";
    },
    tableRowCellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.status == 1) return "row-cell";
      else if (column.property == "status" && row.status == 0)
        return "row-cell-disable";
    },
    async shareOpen() {
      let res = await freevideoApi.getKind();
      if (res.code == 15000) {
        this.share.kinds = res.data.items;
        this.share.dialogVisible = true;
      }
    },
    shareClick() {
      this.$refs["shareForm"].validate(valid => {
        if (valid) {
          this.shareCommit();
        }
      });
    },
    async shareCommit() {
      let res = await freevideoApi.shareCommit(this.share.form);
      if (res.code == 15000) {
        this.share.dialogVisible = false;
        this.share.form = {};
        this.$message({
          type: "success",
          message: res.message
        });
      }
    },
    spit() {
      // console.log("哈哈");
    }
  }
};
</script>

<style lang="scss" >
@import "~/assets/css/common.scss";
$base-size: 1vw;
$width: $main-width*0.85;
.tool-bar {
  margin: {
    top: 2vh;
  }
}
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
  .row-disable {
    color: rgb(182, 0, 0);
    background: rgba(20, 12, 12, 0.7);
  }
  .row-cell {
    background: rgba(255, 255, 255, 0);
  }
  .row-cell-disable {
    color: red;
    background: rgba(255, 255, 255, 0);
  }
  .th {
    background: rgba(0, 0, 0, 0.7);
  }
  .th-cell {
    background: rgba(0, 0, 0, 0);
  }
}
.el-tag {
  font-size: 1em;
}
.mes {
  margin-top: 0px;
  padding: 2vh;
  text-align: center;
  border-color: #a7b342;
  background: rgba(1, 255, 255, 0.7);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  color: #4e4e4e;
}
.buttons {
  margin: {
    top: 40px;
  }
  display: flex;
  justify-content: space-around;
}
.con-video {
  width: $width;
  margin-top: 2vh;
}
</style>