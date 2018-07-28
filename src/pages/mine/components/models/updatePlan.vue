<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">修改计划</h1>
        <div class="model-content">
          <div class="row">
            <div class="left">每日背诵数量</div>
            <div class="right">
              <input type="text" v-model="planNum">
              <p class="des">单词数&lt;=50，修改后第二天才会起效</p>
              <p class="des">预计完成时间：{{finishDay}}</p>
            </div>
          </div>
          <div class="row">
            <div class="left"></div>
            <div class="right">
              <button class="cancel-btn" @click="closeModel">取消</button>
              <button @click="updatePlan">确认</button>
              <p class="des">{{tip}}</p>
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
      planNum: 0,
      finishDay: '',
      tip: ''
    }
  },
  methods: {
    closeModel: function () {
      this.$store.commit('switchUpdatePlanShow', {status: false, id: ''})
    },
    updatePlan: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/updateplan',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          planid: this.$store.state.ui.upPlanId,
          plannum: this.planNum
        }
      }).then((res) => {
        console.log(res);
        if(res.data == -1) {
          this.tip = "修改失败";
          setTimeout(() => {
            this.tip = ""
          }, 1000)
        } else {
          this.closeModel()
        }
      })
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isUpdatePlanShow
    }
  },
  watch: {
    planNum: function (newVal, oldVal) {
      if(newVal > 50 || newVal < 0) {
        return;
      }
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/calplan',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          planid: this.$store.state.ui.upPlanId,
          plannum: this.planNum
        }
      })
      .then((res) => {
        if(res.data != -1) {
          this.finishDay = res.data;
        }
      })
      .catch((res) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
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
          .des {
            font-size: .9rem;
            margin-top: 1rem;
            color: #999;
          }
        }
      }
    }
  }
}
</style>