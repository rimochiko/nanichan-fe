<template>
  <div class="plan-wrapper">
    <h1 class="section-title">计划管理</h1>
    <div class="plan-list" v-if="plans.length">
      <div class="plan-item" v-for="item in plans" :key="item.id">
        <div :class="['plan-cover', item.status == 1 ? 'default': '']">
          <img :src="item.cover"/>
        </div>
        <div class="plan-detail">
          <h2 class="title">{{item.title}}</h2>
          <p class="des">每日背诵：{{item.dayNum}}个</p>
          <p class="des">添加日期：{{item.createDate}}</p>
          <div class="process-bar">
            <p class="des">完成进度：{{Math.floor(((item.num / item.wordnum))*100)}}%（{{item.num}} / {{item.wordnum}}）</p>
            <span>
              <span class="inner"  :style="'background-size:'+ (item.num / item.wordnum)*100 +'%'"></span>
            </span>
          </div>
        </div>
        <div class="plan-btn" v-if="item.num != item.wordnum">
          <button @click="setDefault(item.id)">切换任务</button>
          <button @click="updatePlan(item.id)">修改计划</button>
        </div>
        <div class="plan-btn" v-else>已完成记忆</div>
      </div>
    </div>
    <div class="plan-none" v-else>空空如也</div>
    <Model />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Model from './models/updatePlan'
export default {
  name: 'Plan',
  data () {
    return {
      plans: []
    }
  },
  created () {
    this.getPlan()
  },
  components: {
    Model
  },
  methods: {
    getPlan: function () {
      if(!window.localStorage.getItem("token") || !window.localStorage.getItem("username")) {
        return;
      }
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/getplan',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username")
        }
      }).then((res) => {
        if(res.data != -1) {
          this.plans = res.data
        }
      }).catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    setDefault: function (id) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/setdefaultplan',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          id: id
        }
      })
      .then((res) => {
        if(res.data == 1) {
          this.$router.push({path: '/mine'})
        }
      })
      .catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    updatePlan: function (id) {
      this.$store.commit('switchUpdatePlanShow', {
        status: true,
        id: id
      })
    }
  },
  computed: {
    ...mapGetters([
      'isUpdatePlanShow'
    ])
  },
  watch: {
    isUpdatePlanShow: function (newVal, oldVal) {
      if(newVal == false && oldVal == true) {
        this.getPlan()
      }
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.plan-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .plan-list {
    padding: 1.5rem 2rem 0rem;
  }
  .plan-item {
    padding-bottom: 2rem;
    .plan-cover,
    .plan-detail,
    .plan-btn {
      display: table-cell;
      vertical-align: top;
    }
    .plan-cover {
      padding-right: 2rem;
      width: 10rem;
      height: 12rem;
      overflow: hidden;
      position: relative;
      &.default::after {
        position: absolute;
        width: 2.5rem;
        height: 1rem;
        left: .5rem;
        top: .5rem;
        line-height: 1rem;
        font-size: .8rem;
        text-align: center;
        background-color: #FFF;
        content: '默认';
        padding: .2rem;
        border-radius: .5rem;
      }
      img {
        width: 100%;
        height: 100%; 
        border-radius: .5rem;
      }
    }
    .plan-detail {
      width: 57%;
      padding-right: 2rem;
      .title {
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      .des {
        color: #999;
      }
    }
    .plan-btn {
      width: 10rem;
      vertical-align: middle;
      color: #999;
      font-size: 1rem;
      button {
        display: block;
        border: 1px solid #DDD;
        padding: .6rem 1.5rem;
        color: #666;
        background-color: #FFF;
        font-size: 1rem;
        border-radius: .5rem;
        margin-bottom: 1rem;
        transition: all .2s;
        &:hover {
          background-color: #FAFAFA;
        }
      }
    }
    .process-bar {
      span {
        position: relative;
        display: block;
        width: 80%;
        height: .3rem;
        background-color: #EEE;
        border-radius: .5rem;
        .inner {
          position: absolute;
          display: block;
          content: '';
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to right, @normalblue, @normalpurple);
          background-repeat: no-repeat;
          border-radius: .5rem;
        }
      }
    }
  }
  .plan-none {
    font-size: 2.6rem;
    text-align: center;
    padding-top: 3.5rem;
    padding-bottom: 4rem;
    color: #DDD;
    a {
      color: #BBB;
      font-size: 1.8rem;
    }
  }
}
</style>