<template>
  <div class="option-wrapper">
    <button @click="prevStudyIndex" v-show="studyIndex != 0">上一个</button>
    <button @click="nextStudyIndex" v-show="studyIndex != wordsLen - 1">下一个</button>
    <button @click="finishRem" v-show="studyIndex == wordsLen - 1">完成学习</button>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'RemOption',
  methods: {
    ...mapActions([
      'nextStudyIndex',
      'prevStudyIndex'
    ]),
    finishRem: function () {
      this.$store.commit('setStudyIndex', 0);
      this.$router.push({path: '/mine'});
    }
  },
  computed: {
    ...mapGetters([
      'studyIndex',
      'wordsLen'
    ])
  }
}
</script>
<style  scoped lang="less">
@deepblue: #41b5a7;
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