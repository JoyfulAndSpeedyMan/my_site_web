<template>
    <div class="cards">
      <IndexCard v-for="card in cards" :key="card.id" :card="card" @click="cardClick()"></IndexCard>
    </div>
</template>

<script>
import IndexCard from "~/components/IndexCard";
import categoryApi from "~/api/category";
export default {
  async asyncData() {
    let res = await categoryApi.getGategories();
    // console.log(res);
    return {
      cards: res.data.items
    };
  },
  data() {
    return {
      cards: [],
      count: 0
    };
  },
  computed:{
  },
  methods: {
    load () {
        this.count += 2
    },
  },
  components: {
    IndexCard
  }
};
</script>
<style lang="scss">
@import "~/assets/css/common";
.cards {
  margin-top: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
}
.card {
  margin-top: 20px;
}
.content {
  // width: 100%;
  display: flex;
  // justify-content: center;
}
</style>