<template>
  <div class="panel-wrapper">
    <h1 class="section-title">学习广场</h1>
    <div class="record-list">
      <div class="record-item" v-if="record.length" v-for="item in record" :key="item.id">
        <div class="avatar">
          <img :src="item.avatar?item.avatar: require('../../../assets/images/avatar.jpg')">
        </div>
        <div class="detail">
          <p class="des"><router-link :to="'/user/'+item.username">{{item.nickname}}</router-link> {{item.dayDate}}</p>
          <p class="main"><span v-if="item.status==1">进行了<router-link :to="'/book/' + item.bookid + '/1'">《{{item.title}}》</router-link>的记忆，此次记忆</span><span v-else>进行了复习任务，此次复习了</span>{{item.dayNum}}个单词，正确率为{{((1-(item.wrongNum / item.dayNum))*100).toFixed(2)}}%。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'New',
  data () {
    return {
      record: []
    }
  },
  created () {
    this.getRecord()
  },
  methods: {
    getRecord: function () {
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/user/allrecord'
      })
      .then((res) => {
        this.record = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
.panel-wrapper {
  background-color: #FFF;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  border-radius: 1rem; 
  margin: 0 0 2rem;
  .record-list {
    padding: 0 1rem 1rem;
  }
  .record-item {
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    a {
      color: @normalblue;
    }
    .avatar {
      vertical-align: top;
      display: table-cell;
      img {
        width: 5rem;
        border-radius: .5rem;
      }
    }
    .detail {
      vertical-align: top;
      display: table-cell;
      padding-left: 1rem;
      .des {
        color: #999;
      }
      .main {
        margin-bottom: 0;
        line-height: 1.8;
      }
    }
  }
}
</style>