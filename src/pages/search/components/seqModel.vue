<template>
  <div class="model-wrapper" v-show="isShow">
  <div class="center-box">
    <div class="model-box">
      <h1 class="section-title">添加新例句</h1>
      <div class="model-content">
        <div class="row">
          <div class="left">日文原句</div>
          <div class="right">
            <input type="text" v-model="origin">
          </div>
        </div>
        <div class="row">
          <div class="left">中文翻译</div>
          <div class="right">
            <input type="text" v-model="meaning">
          </div>
        </div>
        <div class="row">
          <div class="left">配图</div>
          <div class="right">
            <input type="file" ref="cover">
          </div>
        </div>
        <div class="row">
          <div class="left">例句出处</div>
          <div class="right">
            <input type="text" v-model="ref">
          </div>
        </div>
        <div class="row">
          <div class="left"></div>
          <div class="right">
            <span>{{tip}}</span>
          </div>
        </div>
        <div class="row">
          <div class="left"></div>
          <div class="right">
            <button class="cancel-btn" @click="cancelClose">取消</button>
            <button @click="addSeq">提交</button>
          </div>
        </div>
      </div>
    </div>      
  </div>
  </div>
</template>
<script>
export default {
  name: 'seqModel',
  data () {
    return {
      origin: '',
      meaning: '',
      ref: '',
      tip: ''
    }
  },
  methods: {
    cancelClose: function () {
      this.$store.commit('switchAddSeqShow', {
        status: false,
        id: null
      })
    },
    addSeq: async function () {
      console.log(!this.origin || !this.meaning)
      if(!this.origin || !this.meaning) {
        this.tip = "日语原句和中文翻译都必须填写"
        return;
      }
      let cover = this.$refs.cover
      let data = ''
      if(cover.files[0]) {
        let reader = new FileReader()
        await new Promise((resolve, reject) => {
          reader.readAsDataURL(cover.files[0])
          reader.onload = function(e) {
            data = e.target.result
            resolve(1)
          }
        })
      }
      
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/word/addSeq',
        data: {
          username: window.localStorage.getItem("username"),
          token: window.localStorage.getItem("token"),
          wordid: this.$store.state.ui.addSeqId,
          orgin: this.origin,
          meaning: this.meaning,
          cover: data,
          ref: this.ref
        }
      })
      .then((res) => {
        if(res.data == "-1") {
          this.tip = "添加出错";
        }
        setTimeout(() => {
          this.$store.commit('switchAddSeqShow', {
            status: false,
            id: null
          })
         this.tip = "";
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    isShow: function () {
      console.log(this.$store.state.ui.isAddSeqShow)
      return this.$store.state.ui.isAddSeqShow
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
  z-index: 500;
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