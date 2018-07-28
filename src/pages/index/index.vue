<template>
  <div class="index-wrapper">
    <div class="left-section">
      <Welcome />
      <New />
    </div>
    <div class="right-section">
      <Rank />
    </div>
  </div>
</template>
<script>
import Welcome from './components/welcome.vue'
import Introduction from './components/introduction.vue'
import Rank from './components/Rank'
import New from './components/New'
export default {
  name: 'Index',
  components: {
    Welcome,
    Introduction,
    Rank,
    New
  }
}
</script>
<style  scoped lang="less">
.index-wrapper {
  padding: 4rem 4rem 0;
  .left-section {
    float: left;
    width: 70%;
  }
  .right-section {
    float: right;
    width: 26%;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>