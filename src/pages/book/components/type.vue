<template>
  <keep-alive>
    <div class="type-wrapper">
      <h2 class="section-title">{{title}}</h2>
      <ul class="list">
        <li v-for="item in data" :key="item.id"><router-link :to="item.href">{{item.name}}</router-link></li>
      </ul>
    </div>
  </keep-alive>
</template>
<script>
export default {
  name: 'Type',
  props: ['title', 'data']
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.type-wrapper {
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
  .list {
    overflow: hidden;
    padding: 0 2rem;
    & > li {
      margin-bottom: 1rem;
      &.active,
      &:hover {
        & > a {
          background-color: @normalblue;
          color: #FFF;
        }
      }
      & > a {
        border-radius: .3rem;
        display: block;
        font-size: 1.1rem;
        color: #666;
        padding: .6rem 0;
        text-align: center;
      }
    }
  }
}
</style>