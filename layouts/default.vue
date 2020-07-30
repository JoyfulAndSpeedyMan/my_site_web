<template>
<div>
  <Header/>
  <div class="main">
        <el-backtop></el-backtop>
    <nuxt/>
 
  </div>
  <Footer/>
</div>
</template>

<script>

import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss">
@import "~/assets/css/common";
body{
  margin: 0 0;
  padding: 0 0;
}
.main{
    display: flex;
    justify-content: center;
}

</style>
