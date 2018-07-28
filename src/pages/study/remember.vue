<template>
  <div class="remember-wrapper">
    <RemStatus />
    <RemWord/>
    <RemOption />
  </div>
</template>
<script>
import RemStatus from './components/remstatus.vue'
import RemWord from './components/remword.vue'
import RemOption from './components/remoption.vue'
export default {
  name: 'Remember',
  components: {
    RemStatus,
    RemWord,
    RemOption
  }
}
</script>
<style  scoped lang="less">

.remember-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 0rem;
  background-color: #F0F0F0;
  height: 100%;
}
</style>