<template>
  <div class="res-wrapper">
    <Search :keyword="keyword"/>
    <div class="main-section">
      <div class="left-section">
        <Option :data="word"/>
        <WordDetail :word="word[index]"/>
      </div>
      <div class="right-section">
        <Relate />
        <More />
      </div>
    </div>
    <SeqModel />
  </div>
</template>
<script>
import Search from './components/search'
import Option from './components/option'
import Relate from './components/relate'
import More from './components/more'
import WordDetail from './components/wordDetail'
import SeqModel from './components/seqModel'
import {mapGetters} from 'vuex'
export default {
  name: 'SearchRes',
  components: {
    Relate,
    Search,
    WordDetail,
    Option,
    More,
    SeqModel
  },
  data () {
    return {
      keyword: '',
      word: [],
      index: 0
    }
  },
  created () {
    this.keyword = this.$route.params.keyword;
    this.getResult();
  },
  methods: {
    getResult: function () {
      let ways = this.$route.params.way;
      let url;
      if(ways === 'jc') {
        url = 'http://localhost:3000/word/searchj/';
      } else if(ways === 'cj') {
        url = 'http://localhost:3000/word/searchc/';
      } else {
        return;
      }
      let keyword = this.$route.params.keyword
      this.$ajax({
        method: 'get',
        url: url + keyword,
      })
      .then((res) => {
        if(res.data) {
          this.word = res.data
          console.log(this.word[this.index])
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'isAddSeqShow'
    ])
  },
  watch: {
    $route: function () {
      this.getResult()
    },
    isAddSeqShow: function(newVal, oldVal) {
      if(newVal == false & oldVal == true) {
        this.getResult()
      }
    }
  }
}
</script>
<style  scoped lang="less">
.res-wrapper {
  .main-section {
    padding: 2rem 4rem;
  }
  .left-section {
    float: left;
    width: 76%;
  }
  .right-section {
    float: right;
    width: 20%;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>