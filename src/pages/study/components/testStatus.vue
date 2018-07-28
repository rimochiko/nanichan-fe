<template>
  <div class="status-wrapper">
    <div class="right-section">
      <span class="now">{{testIndex + 1}} / {{wordsLen}}</span>
      <span class="squarebar">
        <span class="real" :style="process"></span>
      </span>
    </div>
    <div class="left-section">
      <a href="#" class="close-btn" @click="closeWindow"><i class="fa fa-remove"></i></a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Status',
  computed: {
    ...mapGetters([
      'testIndex',
      'wordsLen'
    ]),
    process: function () {
      return 'background-size:' + ((this.testIndex + 1)/ this.wordsLen)*100 +'%';
    }
  },
  methods: {
    closeWindow: function () {
      this.$store.commit('switchTestCloseShow', true)
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;

.status-wrapper {
  padding: 2rem 8rem 0;
  &::after {
    display: block;
    content: '';
    clear: both;
  }
  .right-section {
    float: left;
    width: 92%;
    font-size: 0;
    .now {
      width: 5%;
      display: inline-block;
      color: #999;
      font-size: .9rem;
      margin-right: 1rem;
    }
    .squarebar {
      width: 93%;
      height: .3rem;
      display: inline-block;
      background-color: #CECECE;
      background-repeat: no-repeat;
      border-radius: .5rem;
      position: relative;
      .real {
        display: block;
        border-radius: .5rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .3rem;
        transition: all .2s;
        background-repeat: no-repeat;
        background-image: linear-gradient(to right, @normalblue, @normalpurple); 
      }
    }
  }
  .left-section {
    float: right;
    width: 8%;
    font-size: 1.4rem;
    text-align: right;
    .close-btn {
      color: #CECECE;
      transition: all .2s;
      &:hover {
        color: @normalblue;
      }
    }
  }
}
</style>