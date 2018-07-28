<template>
  <div class="mine-wrapper">
    <div class="left-section">
      <router-view></router-view>
    </div>
    <div class="right-section">
      <About />
      <Type :data="options" title="操作面板"/>
    </div>
  </div>
</template>
<script>
import About from './components/about.vue'
import Numchart from './components/numchart.vue'
import Type from '../book/components/type.vue'
export default {
  name: 'Mine',
  components: {
  	About,
    Numchart,
    Type
  },
  created () {
    if(!this.$store.state.user.token) {
      this.$router.push({path: '/'})
    }
  },
  data () {
    return {
      options: [{
        key: 0,
        name: '今日任务',
        href: '/mine',
      },{
        key: 2,
        name: '我的单词',
        href: '/mine/word',
      },{
        key: 3,
        name: '我创建的本子',
        href: '/mine/book',
      },{
        key: 4,
        name: '计划管理',
        href: '/mine/plan',
      }, {
        key: 5,
        name: '学习记录',
        href: '/mine/record',
      }, {
        key: 6,
        name: '统计图',
        href: '/mine/chart',
      }, {
        key: 7,
        name: '修改个人信息',
        href: '/mine/profile',
      }]
    }
  }
}
</script>
<style  scoped lang="less">
.mine-wrapper {
  padding: 4rem 4rem 0;
  .left-section {
    float: left;
    width: 70%;
  }
  .right-section {
    float: right;
    width: 26%;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>