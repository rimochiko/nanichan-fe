<template>
  <div class="user-opts">
    <ul class="all-users">
      <li v-for="item in data.avatar" :key="item.id"><img :src="item.avatar? item.avatar: require('../../../assets/images/avatar.jpg')"/></li>
      <li class="tip-li">{{data.studyNum}}人背诵</li>
    </ul>
    <div class="share-users">
      <p>分享单词本 <span class="icon"><i class="fa fa-weixin"></i></span><span class="icon"><i class="fa fa-weibo"></i></span><span class="icon"><i class="fa fa-qq"></i></span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Option',
  components: {
    Option
  },
  props: ['data']
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
.user-opts {
  background-color: #FFF;
  padding: 1.6rem;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  .all-users {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    & > li {
      display: inline-block;
      margin-left: -1rem;
      &:first-child {
        margin-left: 0rem;
      }
      &.tip-li {
        margin-left: 0rem;
        font-size: .9rem;
        color: #999;
      }
      img {
        width: 2rem;
        border: .1rem solid #FFF;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
  .share-users {
    color: #999;
    .icon {
      cursor: pointer;
      margin-left: .5rem;
      transition: all .2s;
      &:hover {
        color: @normalblue;
      }
    }
    p {
      margin-bottom: 0;
    }
  }
}
</style>