<template>
  <div class="full-wrapper">
    <div class="status-wrapper">
      <div class="left-section">
        <a href="#" class="close-btn" @click="closeWindow"><i class="fa fa-remove"></i></a>
      </div>
    </div>
    <div class="testres-wrapper">
      <div class="reshead">
        <p>本轮复习完毕</p>
        <p class="main"><span class="des">正确率</span>{{percent}}%</p>
      </div>
      <ul class="res-content">
        <li class="head">需要加强的单词：</li>
        <li v-for="item in word" :key="item.id">{{item.name}}（{{item.meaning}}）</li>
      </ul>
      <div class="res-footer">
        <button @click="closeWindow">确认退出</button>
      </div>
    </div>
  </div>
</template>
<script>
import ReviewStatus from './components/reviewstatus.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'testRes',
  components: {
    ReviewStatus
  },
  data () {
    return {
      word: []
    }
  },
  computed: {
    ...mapGetters([
      'reviewLen',
      'rwrongLen',
      'review',
      'reviewWrong'
    ]),
    percent: function () {
      return 100 - (this.rwrongLen / this.reviewLen).toFixed(2) * 100
    }
  },
  methods: {
    closeWindow: function () {
      this.$router.push({path: '/mine'})
    }
  },
  created () {
    this.$store.commit('setReviewIndex', 0)
    let wrong = this.$store.state.word.reviewWrong
    let words = this.$store.state.word.review
    words.forEach((item, index) => {
      if(wrong.indexOf(item.id) >= 0) {
        this.word.push(item)
      }
    })
    
    this.$ajax({
      method: 'post',
      url: 'http://localhost:3000/user/addrecord',
      data: {
        username: window.localStorage.getItem("username"),
        token: window.localStorage.getItem("token"),
        dayNum: this.reviewLen,
        status: 2,
        wrongNum: this.rwrongLen
      }
    })
    .then((res) => {
      if(res.data >= 0) {
        this.$store.commit('setPoints', res.data)
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
.status-wrapper {
  padding: 2rem 8rem 0;
  &::after {
    display: block;
    content: '';
    clear: both;
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
.full-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 0rem;
  background-color: #F0F0F0;
  height: 100%;
  -webkit-user-select:none; 
  -ms-user-select:none; 
  user-select:none;
}
.testres-wrapper {
  background-color: #FFF;
  width: 28rem;
  margin: 4rem auto;
  border-radius: .5rem;
  .reshead {
    width: 100%;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    background-color: @normalblue;
    color: #FFF;
    font-size: 1.2rem;
    text-align: center;
    padding: 2rem 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .05);
    .main {
      font-size: 3rem;
      color: #FFF;
      margin-top: 1rem;
      .des {
        font-size: 1.4rem;
        margin-right: 1rem;
      }
    }
  }
  .res-content {
    padding: 1rem;
    line-height: 1.8;
  }
  p {
    margin: 0;
    &.main {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #3C3C3C;
    }
    &.sub {
      text-align: center;
      font-size: 1.5rem;
      color: #999;
      i {
        margin-left: .5rem;
      }    
    }    
  }
  .res-content {
    padding: 1rem;
    height: 8rem;
    overflow-y: scroll;
    margin: 1rem;
  }
  .res-footer {
    text-align: center;
    button {
      color: #FFF;
      background: @normalblue;
      border-radius: 1.4rem;
      font-size: 1.2rem;
      margin: 1rem;
      border: none;
      padding: .6rem 2rem;
      outline: none;
      transition: all .2s;
      &:hover {
        background-color: @deepblue;
      }
    }
  }
}

</style>