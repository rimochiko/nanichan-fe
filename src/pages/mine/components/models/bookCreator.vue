<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">创建新单词本</h1>
        <div class="model-content">
          <div class="row">
            <div class="left">单词本名</div>
            <div class="right">
              <input type="text" v-model="title" @blur="checktitle">
              <span class="des">{{titletip}}</span>
            </div>
          </div>
          <div class="row">
            <div class="left">类别</div>
            <div class="right">
              <select v-model="typeid">
                <option v-for="item in types" :key="item.id" :value="item.id">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="left">封面</div>
            <div class="right">
              <vueCropper
                class="cropbox"
                ref="cropper"
                :img="cover"
                :autoCropWidth="800"
                :autoCropHeight="600"
                :fixedBox="true">
              </vueCropper>
              <input type="file" @change="changeImg">
            </div>
          </div>
          <div class="row">
            <div class="left">单词书介绍</div>
            <div class="right">
              <textarea v-model="des"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="left"></div>
            <div class="right">
              <button class="cancel-btn" @click="closeModel">取消</button>
              <button @click="addBook">确认</button>
              <p class="des">{{tip}}</p>
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
  name: 'BookCreator',
  data () {
    return {
      title: '',
      titletip:  '',
      typeid: 1,
      types: [],
      cover: '',
      des: '',
      tip: ''
    }
  },
  components: {
    VueCropper
  },
  created () {
    this.getTypes()
  },
  methods: {
    closeModel: function () {
      this.$store.dispatch('switchBookCreatorShow', false)
    },
    changeImg: function (e) {
      let file = e.target.files[0],
          that = this,
          reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        that.cover = e.target.result
      }
    },
    checktitle: function () {
      if(!this.title) {
        this.titletip = "标题不能为空"
        return;
      }
      this.titletip = ""
    },
    addBook: async function () {
      if(!this.title) {
        this.titletip = "标题不能为空"
        return;
      }
      this.titletip = ""
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
        url: 'http://localhost:3000/book/newbook',
        data: {
          'title': this.title,
          'cover': this.cover,
          'des': this.des,
          'typeid': this.typeid,
          'token': window.localStorage.getItem("token"),
          'username': window.localStorage.getItem("username"),
          'avatar': avatar
        }
      }).then((res) => {
        console.log(res);
        if(res.data == -1) {
          this.tip = "创建单词本失败"
        } else {
          this.closeModel()
          this.$router.push({path: '/book/'+res.data+'/1'});
        }
      })
      .catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    getTypes: function () {
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/book/types',
      }).then((res) => {
        if(res.data !== -1) {
          this.types = res.data
        }
      })
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isBookCreatorShow
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
    .cropbox {
      width: 20rem;
      height: 10rem;
      margin-bottom: 1rem;
    }
    .des {
      font-size: .9rem;
      color: #999;
    }
    .model-box {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
      width: 30rem;
      margin: 0 auto;
      background-color: #FFF;
      border-radius: .5rem;
      .model-content {
        padding: 3%;
        width: 94%;
        display: table;
        .row {
          display: table-row;
          .left,
          .right {
            vertical-align: middle;
            display: table-cell;
            padding: .6rem .4rem;
          }
          textarea,
          input,
          select {
            padding: .6rem .8rem;
            border: 1px solid #ddd;
            font-size: 1rem;
            border-radius: .2rem;
            color: #999;
          }
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
          textarea {
            resize: none;
            width: 90%;
          }
        }
      }
    }
  }
}
</style>