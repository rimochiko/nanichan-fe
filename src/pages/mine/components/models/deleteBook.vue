<template>
  <div class="model-wrapper" v-show="isShow">
    <div class="center-box">
      <div class="model-box">
        <h1 class="section-title">删除单词本</h1>
        <div class="model-content">
          <div class="row">
            <p>你真的要删除改单词本吗？</p>
            <p class="des">（相关计划和记录一并删除，已共享单词本无法删除）</p>
          </div>
          <div class="row">
            <button @click="closeModel">确认</button>
            <button class="cancel-btn" @click="cancelClose">取消</button>
            <p class="des">{{tip}}</p>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: 'Model',
  data () {
    return {
      tip: ''
    }
  },
  methods: {
    closeModel: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/book/removebook',
        data: {
          'token': window.localStorage.getItem("token"),
          'username': window.localStorage.getItem("username"),
          'bookid': this.$store.state.ui.deleteBookId
        }
      })
      .then((res) => {
        if(res.data == "-1") {
          this.tip = "删除失败";
        }
        setTimeout(() => {
          this.tip = ""
          this.$store.commit('switchDeleteBookShow', {
            status: false,
            id: null
          })
        }, 1000)
      })
    },
    cancelClose: function () {
      this.$store.commit('switchDeleteBookShow', {
        status: false,
        id: null
      })
    }
  },
  computed: {
    isShow: function () {
      return this.$store.state.ui.isDeleteBookShow
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
    .des {
      font-size: .9rem;
      color: #999;
      margin-top: 1rem;
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
        .row {
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
}
</style>