<template>
  <ul class="page">
    <li v-for="n in pageNum" :key="n" :class="isActive ? 'active': ''"><router-link :to="'/book/' + id + '/' + n">{{n}}</router-link></li>
  </ul>
</template>
<script>
export default {
  name: 'Page',
  props: ['size', 'all', 'id'],
  computed: {
    pageNum: function () {
      return Math.ceil(this.all / this.size);
    },
    isActive: function () {
      return false
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;

.page {
  margin-top: 1rem;
  font-size: 0;
  & > li {
    display: inline-block;
    & > a {
      display: block;
      font-size: .9rem;
      padding: .4rem 1rem;
      color: #666;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      &:hover {
        background-color: @normalblue;
        color: #FFF;
      }
    }
    &:first-child > a {
      border-top-left-radius: .5rem;
      border-bottom-left-radius: .5rem;
      border-left: 1px solid #ddd;
    }
    &:last-child > a {
      border-top-right-radius: .5rem;
      border-bottom-right-radius: .5rem;
    }
  }
}
</style>