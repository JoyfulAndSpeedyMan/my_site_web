<template>
  <div class="header">
    <nav class="navBar">
      <nuxt-link to="/" class="nav" exact active-class="active-class">主页</nuxt-link>
      <nuxt-link v-for="item in navData" :key="item.text" :to="item.to" class="nav" active-class="active-class">{{item.text}}</nuxt-link>
    </nav>
    <UserBase></UserBase>
  </div>
</template>
<script>
import UserBase from "~/components/user/UserBase";
export default {
  components: {
    UserBase
  },
  data() {
    return {
      navData: [
        {
          to: "/api",
          text: "API"
        },
        {
          to: "/detail",
          text: "详情"
        },
        {
          to: "/spit",
          text: "吐槽"
        }
      ],
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/css/common.scss";
$height: 100px;
$logo_width: 222px;
a {
}
a:link {
  text-decoration: none;
}
a:visited {
}
.header {
  background: rgba(255, 255, 255, 0.5) url(/logo/logo_pin.png) no-repeat 10px 5px;
  height: $height;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
}
.navBar {
  display: inline-flex;
  margin-left: $logo_width;
  font-size: 1.7em;
  line-height: $height;
  color: var(--color);
}
.nav {
  text-align: center;
  margin-left: 1.2em;
}

.active-class {
  color: #424241;
  font: {
    size: 1.1em;
    weight: bold;
  }
}
</style>