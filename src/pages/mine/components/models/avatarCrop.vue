<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">截取头像</h1>
        <div class="model-content">
          <div class="row">
            <vueCropper
              class="cropbox"
              ref="cropper"
              :img="img"
              :autoCropWidth="400"
              :autoCropHeight="400"
              :fixedBox="true">
            </vueCropper>
          </div>
          <div class="row">
            <div class="left"></div>
            <div class="right">
              <button class="cancel-btn" @click="closeModel">取消</button>
              <button @click="updateAvatar">确认</button>
              <p class="des">{{updatetip}}</p>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropper'
export default {
  name: 'AvatarCrop',
  props: ['img'],
  components: {
    VueCropper
  },
  data () {
    return {
      updatetip: ''
    }
  },
  methods: {
    closeModel: function () {
      this.$store.dispatch('switchAvatarCropShow', false)
    },
    updateAvatar: async function () {
      // 获取裁剪后图片数据
      let avatar;
      await new Promise((resolve, reject) => {
        this.$refs.cropper.getCropData((data) => {
           resolve(data)
        })
      })
      .then((res) => {
        avatar = res
      });

      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/user/updateAvatar',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
          avatar: avatar
        }
      })
      .then((res) => {
        if(res.data != 1) {
          this.updatetip = '头像修改成功'
          this.$store.commit('setAvatar', res.data)
          setTimeout(() => {
            this.$store.dispatch('switchAvatarCropShow', false)
          })
        } else {
          this.updatetip = '头像修改失败'
        }
      })
      .catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isAvatarCropShow
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.model-wrapper {
  width: 100%;
  height: 100%;
  display: table;
  position: fixed;
  top: 0;
  left: 0;
  .section-title {
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
  }
  .center-box {
    display: table-cell;
    vertical-align: middle;
    .model-box {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
      width: 30rem;
      margin: 0 auto;
      background-color: #FFF;
      border-radius: .5rem;
      .cropbox {
        margin:0 auto 1rem;
        width: 16rem;
        height: 16rem;
      }
      .model-content {
        padding: 5%;
        width: 94%;
        text-align: center;
        button {
          background-color: @normalblue;
          color: #FFF;
          padding: .4rem 1rem;
          font-size: 1rem;
          border-radius: .5rem;
          border: none;
          margin-right: 1rem;
          &.cancel-btn {
            background-color: @normalpurple;
          }
        }
      }
    }
  }
}
</style>