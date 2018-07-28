<template>
  <div class="panel-wrapper">
    <h1 class="section-title">学习记录</h1>
    <div class="record-list">
      <div class="record-item" v-if="record.length">
        <p v-for="item in record" :key="item.id"><span class="time">{{item.dayDate}}</span><span v-if="item.status==1">进行了<router-link :to="'/book/' + item.bookid + '/1'">《{{item.title}}》</router-link>的记忆，此次记忆</span><span v-else>进行了复习任务，此次复习了</span>{{item.dayNum}}个单词，正确率为{{Math.floor((1-(item.wrongNum / item.dayNum))*100)}}%。</p>
      </div>
      <div class="record-none" v-else>没有任何学习记录</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Record',
  data () {
    return {
      record: []
    }
  },
  created () {
    let username = this.$route.params.id
    this.$ajax({
      method: 'post',
      url: 'http://localhost:3000/user/record',
      data: {
        username: username || window.localStorage.getItem("username")
      }
    }).then((res) => {
      if(res.data != -1) {
        this.record = res.data
      }
    }).catch((err) => {
      this.$store.commit('clearUserAll')
      this.$store.commit('clearAllWord')
      this.$router.push({path: '/login'})
    })
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.panel-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .record-list {
    padding: 2rem;
    .record-item {
      p {
        margin-top: 0;
        margin-bottom: 1rem;
        border-radius: .5rem;
        line-height: 2;
      }
      a {
        color: @normalblue;
      }
      .time {
        background-color: #FAFAFA;
        border-radius: .5rem;
        padding: .3rem .5rem;
        color: #999;
        font-size: .8rem;
        margin-right: .5rem;  
      }
    }
    .record-none {
      text-align: center;
      font-size: 2.4rem;
      color: #DDD;
      padding: 3rem 0 3.5rem;
    }
  }
}
</style>