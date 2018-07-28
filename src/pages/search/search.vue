<template>
  <div class="search-wrapper">
    <div class="search-box">
      <div class="search-form">
        <h1 class="title">纳尼查单词</h1>
        <div class="main-box">
          <input class="search-input" placeholder="输入日语/中文/罗马单词" v-model="searchItem"/>
          <button class="key-btn" @click="switchKeyBoard"><span><i class="fa fa-keyboard-o"></i></span></button>
          <button class="search-btn" @click="searchByJ">日→中</button>
          <button class="search-btn" @click="searchByC">中→日</button>
        </div>
      </div>
      <KeyBoard v-show="isKeyBoardShow"/>   
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import KeyBoard from './components/keyboard'
export default {
  name: 'Search',
  components: {
    KeyBoard
  },
  methods: {
    searchByC: function () {
      this.$router.push({ path: '/search/cj/'+ this.searchItem })
    },
    searchByJ: function () {
      this.$router.push({ path: '/search/jc/'+ this.searchItem })      
    },
    switchKeyBoard: function () {
      this.$store.commit('switchKeyBoardShow', !this.isKeyBoardShow)
    }
  },
  computed: {
    ...mapGetters([
      'isKeyBoardShow',
    ]),
    searchItem: {
       set (value) {
          this.$store.commit('setSearchItem',value)
       },
       get(){
           return this.$store.state.ui.searchItem;
       }
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;

.search-wrapper {
  display: table;
  width: 100%;
  height: 31rem;
  .search-box {
    position: relative;
    padding-bottom: 8rem;
    z-index: 100;
    .title {
      font-weight: 300;
      color: #999;
      font-size: 3rem;
    }
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    .search-input {
      height: 4rem;
      font-size: 1.1rem;
      padding: 0 1rem;
      width: 23rem;
      border: none;
      border-top-left-radius: .5rem;
      border-bottom-left-radius: .5rem;
      color: #999;
      box-shadow: 0 10px 20px rgba(0, 0, 0, .03);
      &::-webkit-input-placeholder{
        color: #999;
      }      
    }
    .main-box {
      position :relative;
      width: 42.5rem;
      margin: 0 auto;
    }
    .reslist {
      display: none;
      width: 23rem;
      padding: .8rem 1rem;
      position: absolute;
      left: 0;
      bottom: -1rem;
      transform: translateY(100%);
      border-radius: .5rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, .03);
      background-color: #FFF;
      li {
        width: 100%;
        a {
          display: block;
          font-size: 1.1rem;
          padding: .4rem ;
          text-align: left;
          color: #999;
          transition: all .2s;
          &:hover {
            background-color: #FAFAFA;
          }
        }
      }
    }
    .key-btn {
      height: 4rem;
      padding: 0 1.2rem;
      border: none;
      background-color: @normalpurple;
      color: #FFF;
      font-size: 1rem;
      border-top-right-radius: .5rem;
      border-bottom-right-radius: .5rem;
      margin-left: -.5rem;      
    }
    .search-btn {
      height: 4rem;
      padding: 0 1.2rem;
      border: none;
      background-color: @normalblue;
      color: #FFF;
      border-radius: .5rem;
      font-size: 1rem;
      margin-left: .5rem;
    }
  }
}
</style>