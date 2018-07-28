<template>
  <div class="res-wrapper">
    <div class="search-none" v-if="isShow">
      <p class="main">没有查询结果</p>
      <p class="des">请核对拼写是否有误</p>
    </div>

    <div class="search-res" v-else>
      <div class="main-wrapper">
        <h1 class="name">{{word.name}} <i></i></h1>
        <p class="gara">{{word.kana}} [ {{word.roman}} ]</p>
        <p class="meaning">{{meaning}}</p>
      </div>
      <div class="panel-wrapper" v-for="(item, index) in word.sub" :key="index">
        <h1 class="section-title meaning">{{index + 1}}.{{item.meaning}}</h1>
        <div class="detail">
          <p class="meaning"><span class="type">形容词</span></p>
          <ol class="sequence">
            <li v-for="seq in item.sequence" :key="seq.id">
              <p class="main">{{seq.origin}}</p>
              <p class="des">{{seq.meaning}}</p>
              <p class="des" v-if="seq.cover"><img :src="seq.cover"></p>
            </li>
          </ol>
          <a href="#" @click.prevent="addSeq(item.id, index)" class="add-btn">补充例句</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WordDetail',
  props: ['word'],
  computed: {
    isShow: function () {
      return !this.word;
    },
    meaning: function () {
      if(!this.word.sub) {
        return ''
      }
      let str = ""
      this.word.sub.forEach((item, index) => {
        str += (item.meaning + " / ")
      })
      str = str.slice(0, str.length-2)
      return str
    }
  },
  methods: {
    addSeq: function (id, index) {
      if(this.$store.state.user.token == "") {
        this.$router.push({path: '/login'})
      }
      this.$store.commit('switchAddSeqShow', {
        status: true,
        id: id
      })
    }
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
  .section-title {
    padding: .7rem 1rem;
    color: #777;
    background-color: #F8F8F8;
    font-size: 1rem;
    font-weight: normal;
  }
  .search-item {
    padding:0 1rem 1rem;
  }
}
.main-wrapper {
  margin: 1rem 0 2rem;
  padding: 1rem 1rem;
  background-color: #999;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  background-color: @normalblue;
  color: #FFF;
  border-radius: .5rem;
  position: relative;
  &::after {
    content: '';
    display: block;
    background-color: rgba(0, 0, 0, .3);
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: .5rem;
    top: 0;
    left: 0;
    z-index: 1;
  }
  h1,p {
    margin-top: 0;
    margin-bottom: 1rem;
    position: relative;
    z-index: 100;
  }
  .name {
    font-size: 2.4rem;
    font-weight: 400;
  }
}
.meaning {
  line-height: 1.8;
  .type {
    border-radius: .4rem;
    background-color: @normalblue;
    padding: .2rem .6rem;
    font-size: .8rem;
    margin-right: .5rem;
    color: #FFF;
  }
}
.sequence {
  li {
    margin-bottom: 1rem;
  }
  .main {
    font-size: 1rem;
    color: #888;
  }
  .des {
    font-size: .9rem;
    color: #999;
    img {
      border-radius: .5rem;
      max-width: 40rem;
    }
  }
}
.add-btn {
  color: #999;
  padding: .2rem;
  font-size: .9rem;
}
.detail {
  padding: 0 1rem 1rem;
}
.search-none {
  padding: 2rem;
  color: #DDD;
  text-align: center;
  p {
    margin: 0;
    line-height: 1.8;
    font-size: 2.5rem;
    &.des {
      font-size: 1.5rem;
    }
  }
}
</style>