<template>
<div>
  <TypeNav></TypeNav>
  <list-container></list-container>
  <recommend></recommend>
  <rank></rank>
  <like></like>
  <floor v-for="(floor,index) in floorList" :key="index" :list="floor"></floor>
  <brand></brand>
</div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

import {mapState} from 'vuex'
export default {
  name: "home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  },
  mounted(){
    this.$store.dispatch('getFloorList')
  }
};
</script>

<style lang="scss" scoped>
</style>