<template>
  <div class="user-wrapper">
    <div class="left-section">
      <Record/>
    </div>
    <div class="right-section">
      <Basic/>
    </div>
  </div>
</template>
<script>
import Basic from './components/basic.vue'
import Record from './components/record.vue'
export default {
  name: 'User',
  components: {
  	Basic,
    Record
  }
}
</script>
<style  scoped lang="less">
.user-wrapper {
  padding: 4rem 4rem 0;
  .left-section {
  	float: left;
  	width: 66%;
  }
  .right-section {
    float: right;
    width: 30%
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>