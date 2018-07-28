<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">关闭测试</h1>
        <div class="model-content">
          <div class="row">
            <p>系统不会保存测试状态，确认退出吗</p>
          </div>
          <div class="row">
            <button @click="closeModel">确认</button>
            <button class="cancel-btn" @click="cancelClose">取消</button>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: 'Model',
  methods: {
    closeModel: function () {
      this.$store.commit('switchTestCloseShow', false)
      this.$store.commit('setTestIndex', 0)
      this.$store.commit('setReviewIndex', 0)
      this.$router.push({path: '/mine'})
    },
    cancelClose: function () {
      this.$store.commit('switchTestCloseShow', false)
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isTestCloseShow
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.model-wrapper {
  width: 100%;
  height: 100%;
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  .section-title {
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
  }
  .center-box {
    display: table-cell;
    vertical-align: middle;
    .model-box {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
      width: 30rem;
      margin: 0 auto;
      background-color: #FFF;
      border-radius: .5rem;
      .model-content {
        padding: 3%;
        width: 94%;
        .row {
          text-align: center;
          button {
            background-color: @normalblue;
            color: #FFF;
            padding: .4rem 1rem;
            font-size: 1rem;
            border-radius: .5rem;
            border: none;
            margin-right: 1rem;
            &.cancel-btn {
              background-color: @normalpurple;
            }
          }
        }
      }
    }
  }
}
</style>