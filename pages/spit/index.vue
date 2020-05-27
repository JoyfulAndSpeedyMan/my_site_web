<template>
  <div class="spit-index">
    <div class="spit-index-left">
      <Card class="spit-index-card" v-for="spit in spits" :key="spit._id">
        <div>
          <el-avatar src="/ys.png"></el-avatar>
          <p class="t1" style=" display: inline-block;margin-left:10px">{{spit.nickname}}</p>
        </div>
        <hr />
        <p class="t1">{{spit.title}}</p>
        <span class="cont">{{spit.content}}</span>
      </Card>
    </div>
    <div class="spit-index-right"></div>
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
  methods: {
  async loadMore() {
      // console.log(
      //   `loadMore------ loading:${this.loading} , noMore:${this.noMore}`
      // );
      let res = await spitApi.getSpit(this.page, this.pageSize);
      if (res) {
        this.loading = false;
        if (res.data.size == 0) {
          this.noMore = true;
          console.log('嘿嘿')
          return;
        }
        this.spits = this.spits.concat(res.data.items);
        this.page++;
      }
    }
  },
  data() {
    return {
      spits: [
        {
          _id: 1265475134534275000,
          user_id: 1264556125311787000,
          nickname: "灰太狼",
          avatar: "/ys.png",
          title: "装百影物毛局门资红车去",
          content:
            "织能省电样义办光算革将达究温研复划积五政几清中电角角时六中专低查第别后去参世将信因立达",
          thumbs: 3,
          tag: ["视频网站", "不好用", "太卡"],
          createTime: "1971-06-10"
        },
        {
          _id: 1265475134534275000,
          user_id: 1264556125311787000,
          nickname: "灰太狼",
          avatar: "/ys.png",
          title: "加难要权界业力安程很候段般商以据消众",
          content: "价东例你别年市来内众须油部正快计保证空色近准起法市",
          thumbs: 3,
          tag: ["视频网站", "不好用", "太卡"],
          createTime: "2000-06-10"
        },
        {
          _id: 1265475134534275000,
          user_id: 1264556125311787000,
          nickname: "灰太狼",
          avatar: "/ys.png",
          title: "华当论么任响心照线由得",
          content:
            "打可外即话明团半广养多照很个商单存验生格石门断单界律难应自面市标证近道化经",
          thumbs: 3,
          tag: ["视频网站", "不好用", "太卡"],
          createTime: "1984-10-24"
        },
        {
          _id: 1265475134534275000,
          user_id: 1264556125311787000,
          nickname: "灰太狼",
          avatar: "/ys.png",
          title: "管江总斯龙他角手心达叫了与运看标成目",
          content: "流来常立一属第参度或分京细温支却料住题极表思气太新",
          thumbs: 3,
          tag: ["视频网站", "不好用", "太卡"],
          createTime: "2015-12-16"
        },
        {
          _id: 1265475134534275000,
          user_id: 1264556125311787000,
          nickname: "灰太狼",
          avatar: "/ys.png",
          title: "就且场示们今",
          content:
            "会者越速革路此做全何员合引因运真经党类此光通都斗论家效知感查次多产复结西些还市去查资保一",
          thumbs: 3,
          tag: ["视频网站", "不好用", "太卡"],
          createTime: "1991-11-02"
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
  components: {
    Card
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
  //   height: 50vh;
}
.spit-index-right {
  width: 25%;
  min-height: $min-height;
  @include box;
}
.spit-index-card {
  height: 150px;
  padding: 20px;
  margin-bottom: 10px;
}
.t1 {
  color: #132519;
  font-size: 1.3em;
  font-weight: bold;
  margin: 4px 0px;
}
.cont {
  color: #212121;
  font-size: 1em;
  text-indent: 1em;
}
</style>