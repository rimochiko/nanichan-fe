<template>
  <div class="test-wrapper">
    <ReviewStatus />
    <ReviewWord />
    <Model />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import ReviewStatus from './components/reviewstatus.vue'
import ReviewWord from './components/reviewword.vue'
import Model from './components/model.vue'
export default {
  name: 'Review',
  components: {
    ReviewStatus,
    ReviewWord,
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