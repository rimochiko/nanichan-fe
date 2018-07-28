<template>
  <div class="word-wrapper">
    <div class="word-remember">
      <p class="name">{{word[studyIndex].name}}</p>
      <p class="spell">{{word[studyIndex].kana}} [ {{word[studyIndex].roman}} ]<a href="#" class="icon" @click.prevent="playAudio" v-show="word[studyIndex].audio"><i class="fa fa-volume-up"></i></a></p>
      <p class="meaning"><span class="status">{{word[studyIndex].typeid}}</span>{{word[studyIndex].meaning}}</p>
      <audio src=""  hidden ref="audio"></audio>
      <ul class="sequence" v-if="sequence">
        <li :key="sequence.id">
           <p class="main">{{sequence.origin}}<a href="#" class="icon" @click.prevent="playSeqAudio" v-show="sequence.audio"><i class="fa fa-volume-up"></i></a><audio :src="sequence.audio"  hidden ref="seqaudio"></audio></p>
           <p class="des">{{sequence.meaning}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RemWord',
  data () {
    return {
      word: [],
      sequence: []
    }
  },
  computed: {
    ...mapGetters([
      'studyIndex'
    ])
  },
  created () {
    this.word = this.$store.state.word.words;
    if(!(this.word && this.word.length)) {
      this.$router.push({path: '/mine'})
    }
    this.getSequence()
  },
  mounted () {
    if(this.$refs.audio && this.word[this.studyIndex].audio) {
        this.$refs.audio.src = this.word[this.studyIndex].audio;
        this.$refs.audio.load()
        this.$refs.audio.play()
    }
  },
  methods: {
    playAudio: function () {
      if(this.$refs.audio && this.word[this.studyIndex].audio) {
        this.$refs.audio.play()
      }      
    },
    playSeqAudio: function () {
      if(this.$refs.seqaudio) {
        this.$refs.seqaudio.play()
      }
    },
    getSequence: function () {
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/word/sequence/' + this.word[this.studyIndex].id
      })
      .then((res) => {
        if(res.data.length) {
          this.sequence = res.data[0]
        } else{
          this.sequence = null
        }
      })
    }
  },
  watch: {
    studyIndex: function () {
      if(this.$refs.audio && this.word[this.studyIndex].audio) {
        this.$refs.audio.src = this.word[this.studyIndex].audio
        this.$refs.audio.load()
        this.$refs.audio.play()
      }
      this.getSequence()
    }
  }
}
</script>
<style  scoped lang="less">
.word-wrapper {
  padding: 4rem 8rem;
  p {
    margin: 0;
    &.name {
      text-align: center;
      font-size: 3.2rem;
      margin-bottom: 1rem;
      color: #3C3C3C;
    }
    &.spell {
      text-align: center;
      font-size: 1.5rem;
      color: #999;
      margin-bottom: 1rem;
      .icon {
        vertical-align: middle;
        font-size: 1rem;
        margin-left: .5rem;
        color: #999;
      }
    }
    &.meaning {
      text-align: center;
      font-size: 1rem;
      .status {
        font-size: .9rem;
        background-color: #999;
        color: #FFF;
        margin-right: .5rem;
        border-radius: .5rem;
        padding: .2rem .8rem;
      }
    } 
  }
  .sequence {
    padding-top: 1.8rem;
    text-align: center;
    line-height: 1.8;
    li {
      margin-bottom: 1rem;
      font-size: .9rem;
      .des {
        color: #999;
      }
      a {
        margin-left: .5rem;
        color: #999;
      }
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
  }
}
</style>