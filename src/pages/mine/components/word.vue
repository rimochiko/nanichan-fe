<template>
  <div class="word-wrapper">
    <h1 class="section-title">我的单词</h1>
    <div class="option">
      <ul class="status">
        <li>掌握程度说明：</li>
        <li><span class="great"></span>完全掌握</li>
        <li><span class="normal"></span>熟悉</li>
        <li><span class="low"></span>一般</li>
        <li><span class="bad"></span>不记得</li>
      </ul>
    </div>
    <div class="word-table" v-if="words.length">
      <div class="row" v-for="item in words" :key="item.id">
        <div class="status td"><span :style="getColor(item.status)"></span></div>
        <div class="main td">{{item.name}}</div>
        <div class="des td">{{item.kana}}</div>
        <div class="des td">{{item.meaning}}</div>
      </div>
    </div>
    <div class="word-none" v-else>
      <p>空空如也</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Word',
  data () {
    return {
      words: []
    }
  },
  methods: {
    getWords: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/word/user',
        data: {
          username: window.localStorage.getItem("username"),
          token: window.localStorage.getItem("token")
        }
      })
      .then((res) => {
        if(res.data) {
          this.words = res.data
        }
      })
      .catch((res) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    getColor: function (status) {
      switch(status) {
        case 4: return 'background-color: #ec6941';
        case 3: return 'background-color: #facd89';
        case 2: return 'background-color: #7ecef4';
        case 1: return 'background-color: #89c997';
        default: return 'background-color: #DDD';
      }
    }
  },
  created () {
    this.getWords();
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.word-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .option {
    padding: 1.5rem  2rem 2rem;
    color: #999;
    .status {
      li {
        display: inline-block;
        margin-right: 2rem;
        span {
          display: inline-block;
          margin-right: .5rem;
          width: .8rem;
          height: .8rem;
          border-radius: .5rem;
          border-radius: .2rem;
          &.bad {
            background-color: #ec6941;
          }
          &.low {
            background-color: #facd89;
          }
          &.normal {
            background-color: #7ecef4;
          }
          &.great {
            background-color: #89c997;
          }
        }
      }
      button {
        padding: .5rem 1rem;
        background-color: @normalblue;
        color: #FFF;
        font-size: 1rem;
        border-radius: .5rem;
        border: none;
      }
    }
  }
  .word-table {
    display: table;
    padding: .5rem 2rem 2rem;
    width: 100%;
    .row {
      display: table-row;
      .td {
        display: table-cell;
        vertical-align: middle;
        padding: 1rem 1rem 1rem 0;
        &.main {
          font-size: 1.1rem;
          color: #666;
        }
        &.des {
          color: #999;
        }
        &.status {
          width: 1rem;
        }
      }
      .status {    
        span {
          display: block;
          width: .8rem;
          height: .8rem;
          border-radius: .5rem;
          border-radius: .2rem;
          &.bad {
            background-color: #ec6941;
          }
          &.low {
            background-color: #facd89;
          }
          &.normal {
            background-color: #7ecef4;
          }
          &.great {
            background-color: #89c997;
          }
        }
      }
    }
  }
  .word-none {
    font-size: 2.6rem;
    text-align: center;
    padding-bottom: 2rem;
    color: #DDD;
  }
}
</style>