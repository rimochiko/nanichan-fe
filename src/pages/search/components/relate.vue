<template>
  <div class="panel-wrapper">
    <h1 class="section-title">相关搜索</h1>
    <ul class="word-list" v-if="relate.length">
    	<li v-for="item in relate" :key="item.id"><router-link :to="'/search/jc/' + item.name">{{item.name}}</router-link></li>
    </ul>
    <div class="list-none" v-else>
      <p>暂无相关单词</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Relate',
  data () {
    return {
      relate: []
    }
  },
  created () {
    this.getRelate()
  },
  methods: {
    getRelate: function () {
      let keyword = this.$route.params.keyword;
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/word/relate/' + keyword
      })
      .then((res) => {
        let arr = []
        if(res.data != -1) {
          let i;
          res.data.forEach((item, index) => {
            for(i = index + 1; i < res.data.length; i++) {
              if(item.name == res.data[i].name) {
                break
              }
            }
            if(i == res.data.length) {
              arr.push(item)
            }
          })
          this.relate = arr          
        } else {
          this.relate = []
        }
      })
    }
  },
  watch: {
    $route: function () {
      this.getRelate()
    }
  }
}
</script>
<style  scoped lang="less">
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
  .word-list {
    padding: .5rem 1rem 1rem;
    > li {
      margin-bottom: .5rem;
      > a {
        color: #666;
        font-size: .9rem;
        line-height: 1.8;
      }
    }
  }
  .list-none {
    text-align: center;
    color: #DDD;
    font-size: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
  }
}
</style>