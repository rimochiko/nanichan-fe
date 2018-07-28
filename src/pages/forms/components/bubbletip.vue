<template>
  <div class="bubble-tip" v-if="text && text.length">
    {{text}}
  </div>
</template>
<script>
export default {
  name: 'BubbleTip',
  props: ['text']
}
</script>
<style  scoped lang="less">
.bubble-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: .5rem 1rem;
  border-radius: .4rem;
  background-color: rgba(0 , 0, 0, .4);
  color: #FFF;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  transition: all .4s;
}
</style>