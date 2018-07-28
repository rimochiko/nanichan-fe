<template>
<keep-alive>
  <div class="panel-wrapper">
    <h1 class="section-title">复习任务</h1>
      <div class="task-none" v-if="!allNum">
      <p>无任何任务</p>
    </div>
    <div class="task-box" v-else>
      <div class="task-detail">
        <div class="task-plan">
          <p class="main">系统自选</p>
          <a href="#" class="plan-btn"><span><i class="fa fa-sort"></i></span>切换选择方式</a>
        </div>
        <div class="task-data">
          <p class="num">{{allNum}}</p>
          <p class="des">复习单词个数</p>
        </div>
        <div class="task-data">
          <p class="num">{{testCount}}</p>
          <p class="des">今日复习次数</p>
        </div>
        <div class="task-data">
          <p class="num">{{grade}}%</p>
          <p class="des">正确率</p>
        </div>
      </div>
      <div class="task-opt">
        <router-link to="/review" class="task-btn blue">开始复习</router-link>
        <router-link to="/mine/chart" class="task-btn purple">学习统计</router-link>
      </div>      
    </div>
  </div>
</keep-alive>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'reviewTask',
  computed: {
    ...mapGetters([
      'review',
      'reviewIndex',
    ])
  },
  data () {
    return {
      allNum: 0,
      grade: 0,
      testCount: 0
    }
  },
  created () {
    this.$ajax({
      method: 'post',
      url: 'http://localhost:3000/user/getreviewplan',
      data: {
        token: window.localStorage.getItem("token"),
        username: window.localStorage.getItem("username")
      }
    })
    .then((res) => {
      if(res.data != -1) {
        this.allNum = res.data.words ? res.data.words.length : 0;
        this.grade = res.data.grade;
        this.testCount = res.data.testCount;
        this.$store.commit('setReview', res.data.words? res.data.words : []);
      }
    })
    .catch((err) => {
      this.$store.commit('clearUserAll')
      this.$store.commit('clearAllWord')
      this.$router.push({path: '/login'})
    })
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.panel-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .task-none {
    text-align: center;
    font-size: 2rem;
    color: #EEE;
    padding: 2rem;
  }
  .task-box {
    padding: 0 2rem 2rem;
    .task-plan {
      display: table-cell;
      text-align: center;
      padding-right: 1rem;
      .main {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
      .plan-btn {
        font-size: .9rem;
        color: #999;
        > span {
          margin-right: .3rem;
        }
      }
    }
    .task-detail {
      float: left;
      .task-data {
        padding-left: 2rem;
        display: table-cell;
        .num {
          font-size: 2rem;
          text-align: center;
          margin: 2rem 0 1rem;
        }
        .des {
          color: #999;
          margin: 0;
        }
      }
    }
    .task-opt {
      float: right;
      .task-btn {
        color: #FFF;
        border-radius: 1rem;
        padding: .5rem 1.4rem;
        display: block;
        margin-top: 1rem;
        font-size: 1.2rem;
        &.blue {
          background-color: @normalblue;
        }
        &.purple {
          background-color: @normalpurple;
        }
      }
    }
    &::after {
      display: block;
      clear: both;
      content: '';
    }
  }
}
</style>