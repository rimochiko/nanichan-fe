<template>
  <div class="record-wrapper">
    <div class="panelbox">
      <h1 class="section-title">修改个人信息</h1>
      <div class="profile-list">
        <div class="row">
          <div class="left">账号</div>
          <div class="right">{{info.username}}</div>
        </div>
        <div class="row">
          <div class="left">昵称</div>
          <div class="right"><input type="text" v-model="nickname"></div>
        </div>
        <div class="row">
          <div class="left">性别</div>
          <div class="right">
            <input type="radio" name="sex" value="1" v-model="sex">汉子
            <input type="radio" name="sex" value="2" v-model="sex">妹子
          </div>
        </div>
        <div class="row">
          <div class="left">个人简介</div>
          <div class="right"><textarea name="" id="" cols="30" rows="3" v-model="des"></textarea></div>
        </div>
        <div class="row">
          <div class="left"><button>重置修改</button></div>
          <div class="right"><button @click="updateInfo">确认修改</button><span class="tip">{{basictip}}</span></div>
        </div>              
      </div>
    </div>
    <div class="panelbox">
      <h1 class="section-title">修改头像</h1>
      <div class="profile-list">
        <div class="row">
          <div class="left">选择图片</div>
          <div class="right">
            <Model :img="img"/>
            <input type="file" @change="chooseImg"/>
          </div>
        </div>             
      </div>
    </div>
    <div class="panelbox">
      <h1 class="section-title">密码安全</h1>
      <div class="profile-list">
        <div class="row">
          <div class="left">修改密码</div>
          <div class="right">
            <input type="password" placeholder="输入原始密码"><input type="password" placeholder="输入新密码">
          </div>
        </div>   
        <div class="row">
          <div class="left"></div>
          <div class="right"><button>确认修改</button></div>
        </div>   
      </div>
    </div>

    <div class="panelbox">
      <h1 class="section-title">账号安全</h1>
      <div class="profile-list">
        <div class="row">
          <div class="left">当前邮箱</div>
          <div class="right">virmy@qq.com</div>
        </div>
        <div class="row">
          <div class="left">修改邮箱</div>
          <div class="right">
            <input type="password" placeholder="输入新邮箱"><button class="mail-btn">获取验证码</button><input type="password" placeholder="输入验证码">
          </div>
        </div>   
        <div class="row">
          <div class="left"></div>
          <div class="right"><button>确认修改</button></div>
        </div>   
      </div>
    </div>

  </div>
</template>
<script>
import Model from './models/avatarCrop'
export default {
  name: 'Profile',
  components: {
    Model
  },
  data () {
    return {
      info: {},
      nickname: '',
      des: '',
      sex: 0,
      img: '',
      basictip: ''
    }
  },
  created () {
    this.$ajax({
      url: 'http://localhost:3000/user/info/' + window.localStorage.getItem("username"),
      method: 'get'
    })
    .then((res) => {
      if(res.data == -1) {
        this.$router.push({path: '/login'})
      } else {
        this.info = res.data;
      }
    })
    .catch((err) => {
      this.$store.commit('clearUserAll')
      this.$store.commit('clearAllWord')
      this.$router.push({path: '/login'})
    })
  },
  methods: {
    chooseImg: function (e) {
      let file = e.target.files[0],
          that = this,
          reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.img = e.target.result
        console.log(that.img)
      }
      this.$store.commit('switchAvatarCropShow', true)
    },
    updateInfo: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/updateInfo',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          nickname: this.nickname,
          sex: this.sex,
          des: this.des
        }
      }).then((res) => {
        if(res.data == 1) {
          this.$store.commit('setNickname', this.nickname)
          this.basictip = "资料修改成功"
        } else {
          this.basictip = "资料修改失败"
        }
        setTimeout(() => {
          this.basictip = ''
        }, 2000)
      }).catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@normalpurple: #6562A7;
.panelbox {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .section-title {
    padding: .7rem 1rem;
    color: #777;
    background-color: #F8F8F8;
    font-size: 1rem;
    font-weight: normal;
  }
  .profile-list {
    padding: 1rem 2rem;
    .row {
      display: table-row;
      .left,
      .right {
        display: table-cell;
        padding: 1rem;
        vertical-align: middle;
      }
      button {
        color: #FFF;
        font-size: 1rem;
        padding: .4rem 1rem;
        border-radius: .5rem;
        border: none;
        margin-right: 2rem;
      }
      select {
        font-size: 1rem;
        margin-right:.4rem;
        border-radius: .2rem;
        outline: none;
        padding: .2rem .4rem;
        color: #666;
        border-color: #DDD;
      }
      .left {
        width: 8rem;
        color: #888;
        button {
          background-color: @normalpurple;
        }
      }
      .right {
        width: 75%;
        input[type=text],
        input[type=password],
        input[type=file],
        textarea {
          padding: .6rem .8rem;
          border-radius: .3rem;
          border: 1px solid #ddd;
          font-size: 1rem;
          outline: none;
          color: #666;
          margin: .5rem 1rem .5rem 0;
        }
        textarea {
          resize: none;
          width: 18rem;
          height: 3rem;
          border-color: #DDD;
        }
        input[type=checkbox] {
          border: 1px solid #ddd;
        }
        button {
          background-color: @normalblue;
          &.mail-btn {
            background-color: #FFF;
            border:1px solid #DDD;
            margin-left: 1rem;
            font-size: .9rem;
            color: #999;
          }
        }
      }
    }
  }
}
</style>