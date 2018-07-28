<template>
  <div class="panel-wrapper">
    <h1 class="section-title">活跃排行榜</h1>
    <ul class="rank-list">
       <li class="rank-item" v-for="(item,index) in ranks" :key="index">
         <div class="avatar">
           <img :src="item.avatar? item.avatar:require('../../../assets/images/avatar.jpg')" alt="" class="src">
         </div>
         <div class="info">
           <p class="main">{{item.nickname}}</p>
           <p class="des">+ {{item.points}} 积分</p>
         </div>
         <div class="number">
           NO.{{index + 1}}
         </div>
       </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Rank',
  data () {
    return {
      ranks: []
    }
  },
  created () {
    this.$ajax({
      method: 'get',
      url: 'http://localhost:3000/user/getrank'
    })
    .then((res) => {
      if(res.data != "-1") {
        this.ranks = res.data
        console.log(this.ranks)
      }
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
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  border-radius: 1rem; 
  margin: 0 0 2rem;
  .rank-list {
    .rank-item {
      padding: 0 1rem 1.5rem;
      p {
        margin-bottom: 0;
      }
      .avatar,
      .info,
      .number {
        display: table-cell;
        vertical-align: middle;
      }
      .avatar {
        padding-right: 1rem;
        img {
          width: 2rem;
          border-radius: 50%;
        }
      }
      .info {
        padding-right: 1rem;
        width: 66%;
        .des {
          font-size: .8rem;
          color: #999;
        }
      }
    }
  }
}
</style>