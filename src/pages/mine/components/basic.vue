<template>
  <div class="basic-wrapper">
    <div class="avatar">
      <img :src="avatar" />
    </div>
    <div class="info">
      <h1 class="title">{{info.nickname}}<span class="gen-icon male" v-if="info.sex == 1"><i class="fa fa-mars"></i></span><span class="gen-icon female" v-if="info.sex == 2"><i class="fa fa-venus"></i></span>
      </h1>
      <p class="des">{{des}}</p>
      <p class="des">积分 {{info.points}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Basic',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: ''
    }
  },
  methods: {
    getInfo: function () {
      let id = this.$route.params.id;
      this.$ajax({
        methods: 'get',
        url: 'http://localhost:3000/user/info/' + id,
        data: {
          username: id
        }
      }).then((res) => {
        if(res.data != -1) {
          this.info = res.data
        }
      })    
    }
  },
  computed: {
    avatar: function () {
      if(!this.info || !this.info.avatar) {
        return (require('../../../assets/images/avatar.jpg'))
      }
      return this.info.avatar
    },
    des: function () {
      if(!this.info.des) {
        return "主人顾着学习，没留下任何介绍~"
      }
      return this.info.des
    }
  }
}
</script>
<style  scoped lang="less">
.basic-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
  .avatar {
    padding-bottom: .7rem;
    img {
      border-top-left-radius: .3rem;
      border-top-right-radius: .3rem;
      width: 100%;
    }
  }
  .info {
    padding: 0 0 1rem;
    .title {
      margin: 0;
      font-size: 1.3rem;
      font-weight: normal;
      text-align: center;
      
    }
    .gen-icon {
      vertical-align: middle;
      display: inline-block;
      width: 1.1rem;
      height: 1.1rem;
      margin-left: .4rem;
      line-height: 1.1rem;
      text-align: center;
      border-radius: 50%;
      font-size: .7rem;
      color: #FFF;
      &.female {
        background-color: #FFB6C1;
      }
      &.male {
        background-color: #87CEEB;
      }
    }
    .des {
      font-size: .9rem;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 0;
      text-align: center;
    }
  }
}
</style>