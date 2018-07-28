<template>
  <div class="left-wrapper">
    <div class="detail-main" :style="'background-image: url(' + data.book.cover + ')'">
      <div class="detail-title">
        <h1>{{data.book.title}}</h1>
        <div class="detail-author">
          <p>{{data.book.creator}} 创建</p>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <h2 class="sub-title">词书介绍</h2>
      <div class="sub-content">
        <p>{{data.book.des}}</p>
      </div>
      <h2 class="sub-title">单词列表</h2>
      <div class="add-word" v-if="isAuthor">
        <div class="tip" v-show="tiptext.length">{{tiptext}}</div>
        <div class="add-form">
          <input type="text" placeholder="搜索要添加的单词，选择直接添加" v-model="word">
          <ul class="word-list" v-show="relate && relate.length">
            <li v-for="item in relate" :key="item.id" @click.prevent="addBookWord(item.id)"><a href="#">{{item.name}} [ {{item.roman}} ]   {{item.meaning}}</a></li>
          </ul>          
        </div>
      </div>
      <div class="detail-list">
        <div class="detail-item" v-for="item in words" :key="item.id">
          <div class="col col-3">{{item.name}}</div>
          <div class="col col-3">{{item.kana}}</div>
          <div class="col col-4">{{item.meaning}}</div>
        </div>
        <Page size="10" :all="data.num" :id="data.book.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import Page from './page'
export default {
  name: 'Detail',
  props: ['data'],
  data () {
    return {
      word: '',
      relate: [],
      tiptext: '',
      words: []
    }
  },
  components: {
    Page
  },
  computed: {
    isAuthor: function () {
      return this.data.book.creator.toLowerCase() === window.localStorage.getItem("username").toLowerCase()
    }
  },
  created () {
    this.getWord()
  },
  methods: {
    addBookWord: function (id) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/word/bookadd/',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          wordid: id,
          bookid: parseInt(this.$route.params.id)
        }
      })
      .then((res) => {
        if(res.data == 1) {
          this.word =  ''
          this.relate = []
          this.tiptext = '添加成功'
        } else if(res.data == 2) {
          this.tiptext = '添加失败，单词已存在单词本中'
        } else {
          this.tiptext = '系统出错，添加失败'
        }
        setTimeout(() => {
          this.tiptext = ''
          this.getWord()
        }, 1000)
      });
    },
    getWord: function () {
      let id = this.$route.params.id
      let page = this.$route.params.page
      this.$ajax({
        method: 'post',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          id: id,
          page: page
        },
        url: 'http://localhost:3000/book/word/'
      })
      .then((res) => {
        if(res.data != '-1') {
          this.words = res.data
        }  
      });    
    }
  },
  watch: {
    word: function () {
      if(!this.word) {
        this.relate = []
        return
      }
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/word/relate/' + this.word
      })
      .then((res) => {
        this.relate = res.data
      })
    },
    $route: function () {
      this.getWord()
    }
  }
}
</script>
<style  scoped lang="less">
.left-wrapper {
  float: left;
  width: 70%;
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
}
.detail-main {
  height: 8rem;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  background-size: cover;
  background-position: center;
  position: relative;
  .detail-title {
    float: left;
    bottom: 1rem;
    color: #FFF;
    width: 60%;
    padding: 4% 4%;
    h1 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: 400;
    }
    .detail-author {
      font-size: .9rem;
      img {
        margin-right: .6rem;
        width: 1.5rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      p {
        margin: 0;
      }
    }
  }
}
.add-form {
  position: relative;
  .word-list {
    border-radius: .5rem;
    z-index: 200;
    width: 100%;
    background-color: #FFF;
    position: absolute;
    border: 1px solid #ddd;
    li > a {
      display: block;
      font-size: 1.1rem;
      padding: .4rem .6rem;
      color: #666;
      &:hover {
        background-color: #FAFAFA;
      }
    }
  }
}
.detail-content {
  padding: 2rem;
  .sub-title {
    font-size: 1.2rem;
    font-weight: normal;
  }
  .sub-content {
    padding: .8rem;
    color: #999;
    background-color: #FAFAFA;
    border-radius: .5rem;
    margin-bottom: 1rem;
    p {
      margin: 0;
      line-height: 1.8;
    }
  }
  .tip {
    background-color: #FAFAFA;
    color: #999;
    border-radius: .5rem;
    margin-bottom: 1rem;
    padding: .8rem 1rem;
  }
  .add-word {
    margin-bottom: 1rem;
    input {
      width: 96%;
      padding: .8rem 2%;
      border: 1px solid #DDD;
      font-size: 1rem;
      border-radius: .5rem;
    }
  }
  .detail-item {
    width: 100%;
    display: table;
  }
  .col {
    display: table-cell;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    &.col-3 {
      width: 25%;
    }
    &.col-4 {
      width: 50%;
    }
  }
}
</style>