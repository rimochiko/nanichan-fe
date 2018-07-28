<template>
  <div class="header-wrapper">
    <div class="logo">
      <router-link to="/"><img src="../../../assets/images/logo.svg"></router-link>
    </div>
    <ul class="menu">
      <li><router-link to="/book">单词本</router-link></li>
      <li><router-link to="/search">查单词</router-link></li>
      <li v-if="!isLogin"><router-link to="/login" class="normal-btn">登录</router-link></li>
      <li v-if="!isLogin"><router-link to="/register" class="special-btn">注册</router-link></li>
      <li v-if="isLogin" class="mine-li">
        <router-link to="/mine" class="mine-btn">
          <img :src="avatar ? avatar : require('../../../assets/images/avatar.jpg')"/><span>{{nickname}}<i class="fa fa-angle-down"></i></span>
        </router-link>
        <ul class="dropmenu">
          <li><router-link to="/mine">控制面板</router-link></li>
          <li><router-link :to="userurl">我的主页</router-link></li>
          <li><a href="#" @click.prevent="logout">注销</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'username',
      'nickname',
      'avatar',
      'token'
    ]),
    isLogin: function () {
      if(this.token) {
        return true
      }
      return false
    },
    userurl: function () {
      return '/user/' + this.username;
    }
  },
  created () {
    if(window.localStorage.getItem("token") && !this.token) {
      // 发送请求获取头像和昵称
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/checkToken',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username")
        }
      })
      .then((res) => {
        if(res.data == -1) {
          window.localStorage.setItem("token", "")
          window.localStorage.setItem("username", "")
          this.$store.commit("clearUserAll")
          this.$store.commit("clearAllWord")
        } else {
          this.$store.commit('setToken', window.localStorage.getItem("token"))
          this.$store.commit('setUsername', window.localStorage.getItem("username"))
          this.$store.commit('setAvatar', res.data.avatar)
          this.$store.commit('setNickname', res.data.nickname)
          this.$store.commit('setPoints', res.data.points)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  methods: {
    logout: function () {
      window.localStorage.setItem("token", "")
      window.localStorage.setItem("username", "")
      this.$store.commit("clearUserAll")
      this.$store.commit("clearAllWord")
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #7A65B1;
@deeppurple: #7777A7;

.header-wrapper {
  padding: 0 4rem;
  height: 4.5rem;
  background-color: #FFF;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .03);
  .logo {
    float: left;
    line-height: 4.5rem;
    font-weight: 300;
    a {
      display: block;
      color: #999;
      img {
        display: block;
        margin-top: .8rem;
        height: 2.5rem;
      }
    }
  }
  .menu {
    float: right;
    padding-top: 1rem;
    & > li {
      position: relative;
      display: inline-block;
      font-size: 0;
      &.mine-li {
        padding-right: .6rem;
        &:hover {
          .dropmenu {
            display: block;
          }
        }
      }
      .dropmenu {
        display: none;
        position: absolute;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 7rem;
        background-color: #FFF;
        z-index: 300;
        border-radius: .5rem;
        overflow: hidden;
        box-shadow: 0 1px 20px rgba(0, 0, 0, .03);
        &:hover {
          display: block;
        }
        a {
          font-size: .9rem;
          color: #999;
          display: block;
          padding: .6rem 1.5rem;
          text-align: center;
          transition: all .2s;
          &:hover {
            background-color: #eee;
          }
        }
      }
      .search-input {
        border-radius: 1rem;
        border: 1px solid #DDD;
        padding: .4rem .8rem;
        font-size: .9rem;
        color: #999;
        margin: 0 1rem;
      }
      & > a {
        display: block;
        font-size: 1rem;
        color: #999;
        margin-left: .6rem;
        padding: .4rem 1rem;
        border-radius: .5rem;
        transition: all .2s;
        &:hover {
          color: @normalblue;
        }
        &.normal-btn {
          margin-left: 1rem;
          background-color: @normalblue;
          color: #FFF;
          &:hover {
            background-color: @deepblue;
          }
        }
        &.special-btn {
          background-color: @normalpurple;
          color: #FFF;
          &:hover {
            background-color: @deeppurple;
          }
        }
        &.mine-btn {
          padding: .4rem;
          background-color: #FAFAFA;
          border-radius: .2rem;
          font-size: .9rem;
          i {
            margin-left:.4rem;
          }
          img {
            width: 1.5rem;
            border-radius: .2rem;
            margin-right: .4rem;
            vertical-align: middle;
          }
          &:hover {
            color: #999;
          }
        }
      }
    }
  }
}
</style>