<template>
  <div class="book-item">
    <div class="book-cover">
      <img :src="content.cover"/>
    </div>
    <div class="book-body">
      <div class="book-info">
        <router-link class="book-title" :to="'/book/'+content.id + '/1'">{{content.title}}</router-link>
        <p class="book-des">{{content.des}}</p>
        <p class="book-des">{{content.wordNum}} 个词 / {{content.studyNum}}人学习</p>
        <p class="book-des"><a href="#">{{content.creator}}</a> 创建</p>
      </div>
      <div class="book-opts" v-if="isLogin">
        <a href="#" class="add-btn" @click.prevent="addPlan(content.id)">+</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['content'],
  methods: {
    addPlan: function (id) {
      console.log(id)
      this.$store.commit('switchPlanAddShow', {
        status: true,
        id: id
      })
    }
  },
  computed: {
    isLogin: function () {
      return !!this.$store.state.user.token
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.book-item {
  width: 46%;
  margin-right: 3%;
  margin-bottom: 2rem;
  height: 18rem;
  float: left;
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  .book-cover {
    width: 100%;
    height: 10rem;
    overflow: hidden;
    margin-right: 1rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    position: relative;
    > img {
      width: 100%;
    }
  }
  .book-info {
    float: left;
    padding: 1rem;
    a.book-title {
      display: block;
      color: #666;
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      font-weight: 400;
    }
    .book-des {
      color: #999;
      margin: 0;
      font-size: .9rem;
      line-height: 1.8;
      & a {
        color: #888;
      }
    }
  }
  .book-opts {
    float: right;
    .add-btn {
      float: left;
      margin-right: 2rem;
      margin-top: 2rem;
      width: 4rem;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      border-radius: 50%;
      font-size: 2rem;
      color: #999;
      box-shadow: 0 10px 20px 0 rgba(0,0,0,.15);
      &:hover {
        color: @normalblue;
      }
    }
  }
}
</style>