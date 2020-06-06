<template>
  <div class="card" @click="click">
    <i :class="`${card.icon} icon` " v-if="isIcon" cla></i>
    <div class="img" :style="`background: url(${card.icon}) 50% 0% no-repeat;`" v-else></div>
    <span class="title title-p">{{card.name}}</span>
    <p class="detail">{{card.detail}}</p>
  </div>
</template>
<script>
export default {
  props: ["card"],
  data() {
    return {
    };
  },
  methods: {
    click() {
      this.$router.push(this.card.path);
    }
  },
  computed: {
    isIcon() {
      let s = this.card.icon;
      // console.log(s);
      // let s=/^$/
      if (
        s.startsWith("http") ||
        s.startsWith("/") ||
        s.endsWith("png") ||
        s.endsWith("jpg") ||
        s.endsWith("jpeg")
      )
        return false;
      return true;
    }
  }
};
</script>
<style lang="scss">
@import "~/assets/css/common";
// $card-width: ($main-width - 4.5)/3-50;

.icon {
  display: block;
  text-align: center;
  line-height:$card-height * 0.3 ;
  height: $card-height * 0.3;
  font-size: 5em;
  color: #363582;
}
.img {
  height: $card-height * 0.3;
  margin-top: 5px;
}
.card {
  cursor: pointer;
  box-shadow: $card-shadow;
  width: $card-width;
  height: $card-height;
  display: inline-block;
  background: rgba(255, 255, 255, 0.5) no-repeat 50% 1vh;
  border-radius: 5px;
  transition: transform linear 100ms 0ms;
  &:hover{
    transform: translateY(-5px);

  }
}

.title-p {
  margin: {
    // top: $card-height * 0.3;
  }
}
$detail-space: $card-width * 0.06;
.detail {
  font-size: $card-title-size * 0.5;
  color: #36196f;
  margin: {
    top: $card-height * 0.1;
    left: $detail-space;
    right: $detail-space;
  }
}
</style>