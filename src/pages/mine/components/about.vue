<template>
  <div class="panel-wrapper">
    <h1 class="section-title">关于我</h1>
    <div class="avatar">
      <img :src="userAvatar" />
    </div>
    <div class="info">
      <h1 class="title">{{nickname}}</h1>
      <p class="des">积分 {{points}}</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'About',
  computed: {
    ...mapGetters([
      'avatar',
      'nickname',
      'points'
    ]),
    userAvatar: function () {
      if(!this.avatar) {
        return (require('../../../assets/images/avatar.jpg'))
      }
      return this.avatar
    }
  }
}
</script>
<style  scoped lang="less">
.panel-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .avatar {
    padding: 0 1rem 1rem;
    float: left;
    img {
      display: block;
      width: 4rem;
    }
  }
  .info {
    float: left;
    .title {
      font-size: 1.2rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    .des {
      color: #999;
      margin-bottom: 0;
    }
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>