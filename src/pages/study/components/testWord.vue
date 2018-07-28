<template>
  <div class="full-wrapper">
    <div class="word-wrapper">
      <div class="word-remember" v-show="testform">
        <p class="main">{{word[testIndex].name}}</p>
        <p class="sub">请写出单词的罗马音</p>
        <div class="input-section">
          <input type="text" class="answer-input" v-model="myanswer" @keydown.enter="judgeInput" ref="oneinput" autofocus @keydown.alt="showTip">
          <p><span>Enter</span>确认 <span>Alt</span>提示</p>
          <p class="tip">{{tip}}</p>
        </div>
      </div>
      <div class="word-remember" v-show="!testform">
        <p class="main">{{word.name}}</p>
        <p class="sub">请写出单词的中文<i class="fa fa-volume-down" @click="playAudio"></i></p>
        <div class="input-section">
          <input type="text" class="answer-input" v-model="myanswer" @keydown.enter="judgeInput" ref="twoinput"  @keydown.alt="showTip" @keydown.down="playAudio" autofocus>
          <p><span>Enter</span>确认 <span>Alt</span>提示 <span>Down</span>播放音频</p>
          <p class="tip">{{tip}}</p>
        </div>
        <audio src=""  hidden ref="audio"></audio>
      </div>
    </div>
    <div class="option-wrapper">
      <button>反馈错误</button>
      <button @click="judgeInput" v-show="testIndex != wordsLen - 1">下一个</button>
      <button @click="judgeInput" v-show="testIndex == wordsLen - 1">完成测试</button>
    </div>
    <audio :src="require('../../../assets/right.wav')"  hidden ref="rightAudio"></audio>
    <audio :src="require('../../../assets/wrong.mp3')"  hidden ref="wrongAudio"></audio>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'testWord',
  data () {
    return {
      word: [],
      myanswer: '',
      tip: ''
    }
  },
  computed: {
    ...mapGetters([
      'testIndex',
      'wordsLen'
    ]),
    testform: function () {
      if(!this.word[this.testIndex].meaning) {
        return 1
      }
      if(this.word[this.testIndex].audio) {
        return 0
      }
      return 1
    }
  },
  created () {
    this.word = this.$store.state.word.words;
  },
  mounted () {
    if(this.$refs.audio) {
        this.$refs.audio.src = this.word[this.testIndex].audio
        this.$refs.audio.load()
        this.$refs.audio.play()
    }
  },
  methods: {
    ...mapActions([
      'nextTestIndex'
    ]),
    judgeInput: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/word/finishonetest',
        data: {
          username: window.localStorage.getItem("username"),
          token: window.localStorage.getItem("token"),
          answer: this.myanswer,
          wordid: this.word[this.testIndex].id,
          testform: this.testform
        }
      })
      .then((res) => {
        if(res.data == -1 || res.data == 0) {
          this.$refs.wrongAudio.play()
          this.$store.commit('addTestWrong', this.word[this.testIndex].id)
          if(this.testform) {
            this.$refs.oneinput.className = "answer-input wrong"
          } else {
            this.$refs.twoinput.className = "answer-input wrong"
          }
        } else {
          this.$refs.rightAudio.play()
          if(this.testform) {
            this.$refs.oneinput.className = "answer-input right"
          } else {
            this.$refs.twoinput.className = "answer-input right"
          }
        }

        this.tip = `${this.word[this.testIndex].name}（${this.word[this.testIndex].roman}）：${this.word[this.testIndex].kana} ${this.word[this.testIndex].meaning}`

        setTimeout(() => {
          this.isWrong = false
          this.myanswer = ''
          this.tip = ''
          if(this.testform) {
            this.$refs.oneinput.className = "answer-input"
          } else {
            this.$refs.twoinput.className = "answer-input"
          }
          if(this.testIndex == this.wordsLen - 1) {
            this.$router.push({path: '/test/res'})
          } else {
            this.$store.commit('nextTestIndex')
          }
        }, 2000)

      })
      .catch((err) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    playAudio: function () {
      if(this.$refs.audio && this.word[this.testIndex].audio) {
        this.$refs.audio.play()
      }
    },
    showTip: function () {
      if(this.testform == 1) {
        this.tip = this.word[this.testIndex].meaning
      } else {
        this.tip = this.word[this.testIndex].name
      }
    }
  },
  watch: {
    testIndex: function () {
      if(this.$refs.audio && this.word[this.testIndex].audio) {
        this.$refs.audio.src = this.word[this.testIndex].audio
        this.$refs.audio.load()
        this.$refs.audio.play()
      }      
    }
  }
}
</script>
<style  scoped lang="less">
@deepblue: #41b5a7;
.word-wrapper {
  padding: 4rem 8rem;
  p {
    margin: 0;
    &.main {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #3C3C3C;
    }
    &.sub {
      text-align: center;
      font-size: 1.5rem;
      color: #999;
      i {
        margin-left: .5rem;
      }    
    }    
  }
  .tip {
    font-size: 1rem;
  }
  .sequence {
    padding-top: 1.8rem;
    text-align: center;
    line-height: 1.8;
    li {
      margin-bottom: 1rem;
    }
  }
  .input-section {
    text-align: center;
    margin-top: 2rem;
    font-size: .8rem;
    span {
      padding: .2rem .5rem;
      border-radius: .3rem;
      background-color: #AAA;
      margin-right: .5rem;
      margin-left: 1rem;
      color: #FFF;
    }
    p {
      margin-top: 2rem;
      color: #999;
    }
  }
  .answer-input {
    text-align: center;
    border: 1px solid #EEE;
    font-size: 1.2rem;
    color: #666;
    border-radius: 1rem;
    padding: .6rem 1rem;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
    transition: all .2s;
    &.wrong {
      box-shadow: 0 10px 30px 0 rgba(255,0,0,.15);
    }
    &.right {
      box-shadow: 0 10px 30px 0 rgba(0,255,0,.15);
    }
  }
}
.option-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;
  background-color: #E7E7E7;
  text-align: center;
  & > button {
    border: .1rem solid #999;
    color: #999;
    background: none;
    border-radius: 1.4rem;
    font-size: 1.2rem;
    margin: 1rem;
    padding: .4rem 2rem;
    outline: none;
    transition: all .2s;
    &:hover {
      border-color: @deepblue;
      color: @deepblue;
    }
  }
}
</style>