<template>
  <div class="test-wrapper">
    <TestStatus />
    <TestWord />
    <Model />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import TestStatus from './components/teststatus.vue'
import TestWord from './components/testword.vue'
import Model from './components/model.vue'
export default {
  name: 'Test',
  components: {
    TestStatus,
    TestWord,
    Model
  }
}
</script>
<style  scoped lang="less">
.test-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 0rem;
  background-color: #F0F0F0;
  height: 100%;
  -webkit-user-select:none; 
  -ms-user-select:none; 
  user-select:none;
}
</style>