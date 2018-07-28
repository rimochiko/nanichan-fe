<template>
  <div class="form-wrapper">
    <div class="form-header">
      <h1>登录</h1>
    </div>
    <div class="form-body">
      <div class="form-group">
        <label for="identity">登录凭证</label>
        <input type="text" placeholder="输入用户名/电子邮件" v-model="identity" @blur="checkName">
        <span :class="['tip' ,idenRight && idenRight.length? 'active':'']">{{idenRight}}</span>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" placeholder="输入账号密码" v-model="passwd" @blur="checkPasswd">
        <span :class="['tip' ,passRight && passRight.length? 'active':'']">{{passRight}}</span>
      </div>
      <div class="form-btns">
        <button class="form-btn" @click.prevent="login">{{tipText}}</button>
      </div>
      <div class="form-footer">
        <p>还没有账号<router-link to="/register">注册</router-link></p>
        <p>忘记密码了？<router-link to="/register">重置密码</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      identity: '',
      passwd: '',
      idenRight: '',
      passRight: '',
      tipText: '登录'
    }
  },
  methods: {
    checkPasswd: function () {
      if(this.passwd) {
        this.passRight = ''
        return
      }
      this.passRight = '密码不能为空'
    },
    checkName: function () {
      if(this.identity) {
        this.idenRight = ''
        return
      }
      this.idenRight = '登录凭证不能为空'
    },
    login: function () {
      this.checkPasswd();
      this.checkName();

      if(this.passRight || this.idenRight) {
        return;
      }

      this.tipText = "验证中..."
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/login',
        data: {
          username: this.identity,
          passwd: this.passwd
        }
      })
      .then((res) => {
        if(res.data == "-1") {
          this.tipText = "用户名或密码错误";
          setTimeout(function () {
            this.tipText = "登录"
          }.bind(this), 2000)
        } else {
          //console.log(res.data)
          window.localStorage.setItem("token", res.data.token)
          window.localStorage.setItem("username", res.data.username)
          //console.log(window.localStorage.getItem("token"))
          // 存入vuex中
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('setUsername', res.data.username)
          this.$store.commit('setAvatar', res.data.avatar)
          this.$store.commit('setNickname', res.data.nickname)
          this.$store.commit('setPoints', res.data.points)
          this.$router.push({ path: '/' })
        }
      })
      .catch((err) => {
        this.tipText = "登录失败";
        setTimeout(function () {
          this.tipText = "登录"
        }.bind(this), 1000)        
      })
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;

.form-wrapper {
  width: 23rem;
  background-color: #FFF;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  border-radius: 1rem; 
  margin: 4rem auto 2rem; 
  .form-header {
    padding: 1.5rem 0;
    margin-bottom: 1.5rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background-color: @normalblue;
    & > h1 {
      font-size: 1.6rem;
      font-weight: 300;
      margin: 0;
      color: #FFF;
    }
  }
  .form-group {
    padding: 0 3rem;
    margin-bottom: 1.5rem;
    text-align: left;
    position: relative;
    & > label {
      display: inline-block;
      color: @normalblue;
      margin-bottom: .5rem;
      font-size: .9rem;
      letter-spacing: .02rem;
    }
    .getbtn {
      border: none;
      border: 1px solid #ddd;
      border-radius: .4rem;
      background-color: #FFF;
      color: #666;
      font-size: .8rem;
      padding: .2rem 1rem;
      margin-left: 1rem;
    }

    & > input {
      color: #333;
      padding: .8rem 0;
      border: none;
      width: 100%;
      outline: none;
      font-size: 1rem;
      border-bottom: 1px solid #ddd;
      transition: all .2s;
      &::-webkit-input-placeholder{
        color: #999;
      }
    }
    .tip {
      position: absolute;
      right: 2rem;
      bottom: 0;
      transform: translateX(100%);
      background-color: rgba(32,178,170, .5);
      color: #FFF;
      padding: .2rem 1rem;
      font-size: .9rem;
      border-radius: .3rem;
      opacity: 0;
      transition: all .2s;
      &::before {
        display: block;
        content: '';
        left: -.3rem;
        top: .5rem;
        position: absolute;
        border-top: .3rem solid transparent;
        border-bottom: .3rem solid transparent;
        border-right: .3rem solid rgba(32,178,170, .5);
      }
      &.active {
        opacity: 1;
      }
    }
  }
  .form-btns {
    padding-top: 1.5rem;
    background-color: #FAFAFA;
    .form-btn {
      border: none;
      background-color: @normalblue;
      font-size: 1rem;
      color: #FFF;
      border-radius: 1rem;
      padding: .8rem 4rem;
      transition: all .2s;
      &:hover {
        background-color: @deepblue;
      }
    }
  }
  .form-footer {
    background-color: #FAFAFA;
    padding: 1.4rem 0;
    font-size: .9rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    color: #bababa;
    p {
      margin: 0;
      letter-spacing: .02rem;
      line-height: 1.8;
      > a {
        color: #999;
      }
    }
  }
}
</style>