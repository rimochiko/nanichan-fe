<template>
  <keep-alive>
    <div class="keyboard-wrapper">
      <div class="keyboard-header">
        <a href="#" @click.prevent="toHira">平假名</a><a href="#" @click.prevent="toKata">片假名</a><a href="#" @click.prevent="closeKeyBoard"><i class="fa fa-close"></i></a>
      </div>
      <div class="keyboard-content">
        <div class="cell" v-for="(item, index) in gana" :key="index" @click="addChar">{{status? item.hira: item.kata}}</div>
      </div>  
    </div>
  </keep-alive>
</template>
<script>
export default {
  name: 'KeyBoard',
  data () {
    return {
      status: true,
      gana: [{
        hira: 'あ',
        kata: 'ア'
      },{
        hira: 'か',
        kata: 'カ'
      },{
        hira: 'さ',
        kata: 'サ'
      },{
        hira: 'た',
        kata: 'タ'
      },{
        hira: 'な',
        kata: ''
      },{
        hira: 'は',
        kata: 'ハ'
      },{
        hira: 'ま',
        kata: 'マ'
      },{
        hira: 'ら',
        kata: ''
      },{
        hira: 'や',
        kata: ''
      },{
        hira: 'や',
        kata: ''
      },{
        hira: 'い',
        kata: 'イ'
      },{
        hira: 'き',
        kata: 'キ'
      },{
        hira: 'し',
        kata: 'シ'
      },{
        hira: 'ち',
        kata: 'チ'
      },{
        hira: 'に',
        kata: ''
      },{
        hira: 'ひ',
        kata: 'ヒ'
      },{
        hira: 'み',
        kata: 'ミ'
      },{
        hira: 'り',
        kata: 'り'
      },{
        hira: 'い',
        kata: 'り'
      },{
        hira: 'い',
        kata: 'り'
      },{
        hira: 'う',
        kata: 'ウ'
      },{
        hira: 'く',
        kata: 'ク'
      },{
        hira: 'す',
        kata: 'ス'
      },{
        hira: 'つ',
        kata: 'ツ'
      },{
        hira: 'な',
        kata: 'ナ'
      },{
        hira: 'ふ',
        kata: 'フ'
      },{
        hira: 'む',
        kata: 'ム'
      },{
        hira: 'る',
        kata: ''
      },{
        hira: 'ゆ',
        kata: ''
      },{
        hira: 'わ',
        kata: ''
      },{
        hira: 'え',
        kata: 'エ'
      },{
        hira: 'け',
        kata: 'ケ'
      },{
        hira: 'せ',
        kata: 'セ'
      },{
        hira: 'て',
        kata: 'テ'
      },{
        hira: 'な',
        kata: 'ネ'
      },{
        hira: 'へ',
        kata: 'ヘ'
      },{
        hira: 'め',
        kata: 'メ'
      },{
        hira: 'れ',
        kata: ''
      },{
        hira: 'え',
        kata: ''
      },{
        hira: 'い',
        kata: ''
      },{
        hira: 'お',
        kata: 'オ'
      },{
        hira: 'こ',
        kata: 'コ'
      },{
        hira: 'そ',
        kata: 'ソ'
      },{
        hira: 'と',
        kata: 'ト'
      },{
        hira: 'の',
        kata: 'ノ'
      },{
        hira: 'ほ',
        kata: 'ホ'
      },{
        hira: 'も',
        kata: 'モ'
      },{
        hira: 'ろ',
        kata: ''
      },{
        hira: 'も',
        kata: 'モ'
      },{
        hira: 'を',
        kata: 'モ'
      }]
    }
  },
  methods: {
    toHira: function () {
      this.status = 1;
    },
    toKata: function () {
      this.status = 0;
    },
    closeKeyBoard: function () {
      this.$store.commit('switchKeyBoardShow', false)
    },
    addChar: function (e) {
      let char = e.target.innerHTML;
      this.$store.commit('addSearchItem', char)
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.keyboard-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: .5rem;
  border-radius: .5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .05);
  background-color: #EEE;
  z-index: 300;
  .keyboard-content {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-column-gap: .4rem;
    grid-row-gap: .4rem;
  }
  .keyboard-header {
    margin-bottom: .5rem;
    font-size: 0;
    a {
      padding: 0 1rem;
      height: 2rem;
      line-height: 2rem;
      font-size: .9rem;
      display: inline-block;
      background-color: #FFF;
      border-radius: .5rem;
      margin: 0 .2rem;
      color: #999;
      box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
      &:hover {
        background-color: @normalblue;
        color: #FFF;
      }
    }
  }
  .cell {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: .2rem;
    background-color: #FFF;
    cursor: pointer;
    color: #999;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
    &:hover {
      background-color: @normalblue;
      color: #FFF;
    }
  }
}
</style>