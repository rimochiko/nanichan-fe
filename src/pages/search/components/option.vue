<template>
  <div class="search-res">
    <ul class="search-option">
      <li class="intro">查询到<span class="num">{{num}}</span>种写法：</li>
      <li v-for="item in data" :key="item.id">
        <router-link :to="'/search/jc/'+item.name">{{item.name}}
          <span>[{{item.kana}}]</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Option',
  props: ['data'],
  computed: {
    num: function () {
      return this.data.length;
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.search-option {
  padding: .5rem 1rem 1rem;
  font-size: 0;
  text-align: center;
  li {
    display: inline-block;
    margin-right: 1rem;
    a {
      display: block;
      font-size: 1.3rem;
      border-radius: 0.5rem;
      padding: .8rem 1.2rem;
      background-color: #EEE;
      color: #999;
      span {
        font-size: .8rem;
      }
    }
    &.intro {
      font-size: .9rem;
      color: #999;
      .num {
        color: @deepblue;
        margin: 0 .5rem;
      }
    }
    &.active {
      a {
        background-color: @normalblue;
        color: #FFF;

      }
    }
  }
}
</style>