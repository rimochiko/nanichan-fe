<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">添加新计划</h1>
        <div class="model-content">
          <div class="row">
            <div class="left">每日背诵数量</div>
            <div class="right">
              <input type="text" v-model="planNum" @blur="checkNum">
              <p class="des">{{tip}}</p>
            </div>
          </div>
          <div class="row">
            <div class="left"></div>
            <div class="right">
              <button class="cancel-btn" @click="closeModel">取消</button>
              <button @click="addPlan">确认</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: 'Model',
  data () {
    return {
      planNum: 30,
      tip: ''
    }
  },
  methods: {
    closeModel: function () {
      this.$store.dispatch('clearPlanAdd')
      this.$store.dispatch('switchPlanAddShow', false)
    },
    checkNum: function () {
      if(this.planNum <= 0 || this.planNum > 50) {
        this.tip = "单词数量应在1到50之间"
        return;
      }
      this.tip = ""
    },
    addPlan: function () {
      if(this.planNum <= 0 || this.planNum > 50) {
        this.tip = "单词数量应在1到50之间"
        return;
      }
      this.tip = ""
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/addPlan',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          planid: this.$store.state.ui.addPlanId,
          plannum: this.planNum
        }
      })
      .then((res) => {
        if(res.data == -1) {
          this.closeModel()
          this.$router.push({path: '/'});
        } else {
          this.closeModel()
          this.$router.push({path: '/mine/plan'});
        }
      })
      .catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isPlanAddShow
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
  .des {
    font-size: .9rem;
    color: #999;
    margin-top: 1rem;
    margin-bottom: 0;
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
        display: table;
        .row {
          display: table-row;
          .left,
          .right {
            display: table-cell;
            padding: .6rem .4rem;
          }
          input {
            padding: .6rem .8rem;
            border: 1px solid #ddd;
            font-size: 1rem;
            border-radius: .2rem;
            color: #999;
          }
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