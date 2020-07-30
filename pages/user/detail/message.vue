<template>
  <div>
    <el-timeline style="margin-top:20px;">
      <el-timeline-item
        v-for="msg in messages"
        :key="msg.id"
        :timestamp="msg.createTime"
        placement="top"
        type="primary"
      >
        <Card class="msg-card">
          <p class="t1">{{msg.title}}</p>
          <p class="cont">{{msg.content}}</p>
        </Card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import Card from "~/components/Card.vue";
import userApi from "~/api/user";
export default {
  async asyncData() {
    let res = await userApi.getMessage(1, 4);
    if (res.code == 15000) {
      return {
        messages: res.data.items
      };
    }
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
      cardStyle: {
        "border-radius": "7px",
        "box-shadow": "2px 2px 5px rgba(0,0,0,0.2)",
        background: "rgba(255, 255, 255,0.45)",
        padding: "50px"
      },
      messages: [
        {
          id: 4227465,
          title: "认好口严作事想",
          intro: "律门来军观区工海但点",
          content:
            "内压个研直问离都进不他立每于领书色号员增关装器和得则层识新标料温保总下区多你任装组线民议如并和住才",
          createTime: "1981-01-11",
          level: 1
        },
        {
          id: 5593628,
          title: "样难素世是验",
          intro: "特保强速一调增问龙约到快",
          content:
            "北增参元必情七平米五准由率保下术同且理多利别就马许按属家直因",
          createTime: "2018-02-12",
          level: 1
        }
      ],

      //无限滚动变量
      page: 2,
      pageSize: 5,
      load: false,
      noMore: false,
      loading: false
    };
  },
  methods: {
    async loadMore() {
      // console.log(
      //   `loadMore------ loading:${this.loading} , noMore:${this.noMore}`
      // );
      let res = await userApi.getMessage(this.page, this.pageSize);
      if (res) {
        this.loading = false;
        if (res.data.size == 0) {
          this.noMore = true;
          console.log("嘿嘿");
          return;
        }
        this.messages = this.messages.concat(res.data.items);
        this.page++;
      }
    }
  },
  components: {
    Card
  }
};
</script>
<style lang="scss">
.msg-card {
  background: rgba(234, 234, 234, 0.62);
  min-height: 100px;
  .t1 {
    color: #132519;
    font-size: 1.3em;
    font-weight: bold;
    margin: 0px;
  }
  .cont {
    margin: 10px 0px 0px 0px;
    color: #292628;
    font-size: 1.2em;
  }
}
.el-timeline-item__timestamp {
  color: #2e333c;
}
</style>
