<template>
  <div class="form-wrapper">
    <div class="form-header">
      <h1>注册</h1>
    </div>
    <form class="form-body">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" placeholder="6-16个英文字母/数字" @blur="checkName" v-model="username">
        <span :class="['tip' ,nameRight && nameRight.length? 'active':'']">{{nameRight}}</span>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" placeholder="6-16位任意字符" @blur="checkPasswd" v-model="passwd" autocomplete='password'>
        <span :class="['tip' ,passRight && passRight.length? 'active':'']">{{passRight}}</span>
      </div>
      <div class="form-group">
        <label for="email">电子邮箱</label>
        <input type="text" placeholder="格式正确的邮箱地址" @blur="checkMail" v-model="email"  autocomplete='email'>
        <span :class="['tip' ,mailRight && mailRight.length? 'active':'']">{{mailRight}}</span>
      </div>
      <div class="form-group">
        <label for="code">邮箱验证码</label><button class="getbtn" @click.prevent="getCode">{{codeText}}</button>
        <input type="text" placeholder="电子邮箱验证码" @blur="checkCode" v-model="code">
        <span :class="['tip' ,codeRight && codeRight.length? 'active':'']">{{codeRight}}</span>
      </div>
      <div class="form-btns">
        <button class="form-btn" @click.prevent="register">{{tipText}}</button>
      </div>
      <div class="form-footer">
        <p>已经有账号了？<router-link to="/login">登录</router-link></p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'RegForm',
  data () {
    return {
      username: '111111',
      passwd: '1111111',
      email: 'virmy@qq.com',
      code: '1111',
      nameRight: '',
      passRight: '',
      mailRight: '',
      codeRight: '',
      isSendCode: false,
      codeText: '获取',
      tipText: '注册',
      timer: null,
      time: 59
    }
  },
  methods: {
    checkCode: function () {
      if(!this.code) {
        this.codeRight = '验证码不能为空'
        return
      }
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/checkCode',
        data: {
          code: this.code,
          email: this.email
        }
      }).then((res) => {
        console.log(res.data)
        if(res.data === 1) {
          this.codeRight = ''
        } else {
          this.codeRight = '验证码错误'
        }
      }).catch((err) => {
        this.codeRight = '系统错误，请稍后尝试'
        console.log(err)
      })    
    },
    checkMail: function () {
      if(!this.email) {
        this.mailRight = '邮箱地址不能为空'
        return
      }
      if(!this.email.match(/^\w{5,16}@\w{1,10}\.\w{1,3}$/)) {
        this.mailRight = '邮箱地址不规范'
        return
      }
      this.mailRight = ''
    },
    checkPasswd: function () {
      if(!this.passwd) {
        this.passRight = '密码不能为空'
        return
      }
      
      if(!this.passwd.match(/^\S{6,16}$/)) {
        this.passRight = '密码应在6-16位'
        return
      }
      this.passRight = ''
    },
    checkName: function () {
      if(!this.username) {
        this.nameRight = '用户名不能为空'
        return
      }
      if(!this.username.match(/^\w{6,16}$/)) {
        this.nameRight = '只能包含6-16位字母/数字/下划线'
        return
      }

      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/checkName',
        data: {
          username: this.username
        }
      }).then((res) => {
        console.log(res.data)
        if(res.data === 1) {
          this.nameRight = ''
        } else {
          this.nameRight = '用户名已存在'
        }
      }).catch((err) => {
        this.nameRight = '系统错误，请稍后尝试'
        console.log(err)
      })
    },
    getCode: function () {
      if(this.isSendCode === true) {
        return
      }
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/getcode',
        data: {
          username: this.username,
          email: this.email
        }
      }).catch((err) => {
        console.log(err)
      })

      this.isSendCode = true
      this.timer = setInterval(() => {
        this.codeText = this.time + '秒后重新获取'
        this.time--
        if(this.time === 0) {
          clearInterval(this.timer)
          this.codeText = '获取'
          this.time = 60
          this.isSendCode = false
        }
      },1000)
    },
    register: function () {
      this.checkName()
      this.checkPasswd()
      this.checkCode()
      this.checkMail()
      if(this.nameRight || this.passRight || this.mailRight || this.codeRight) {
        return
      }
      this.tipText = '申请发送中...' 
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/auth/register',
        data: {
          username: this.username,
          email: this.email,
          passwd: this.passwd,
          code: this.code
        }
      }).then((res)=> {
        if(res.data != -1) {
          this.tipText = '注册',
          console.log(res);
          window.localStorage.setItem("token", res.data.token)
          window.localStorage.setItem("username", res.data.username)
          // 存入vuex中
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('setUsername', res.data.username)
          this.$store.commit('setAvatar', '')
          this.$store.commit('setNickname', res.data.nickname)
          this.$router.push({ path: '/mine' })
        }
      }).catch((err) => {
        this.tipText = '注册'
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
      font-size: .9rem;
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