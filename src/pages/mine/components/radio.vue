<template>
  <div class="mck-radio-wrapper">
    <span :class="['mck-radio', isChecked? 'active': '']"></span>
    <input type="radio" :name="name" hidden="hidden" :checked="isChecked">
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'Radio',
  props: ['name', 'isChecked']
}
</script>
<style  scoped lang="less">
.mck-radio-wrapper {
  display: inline-block;
  vertical-align: middle;
  .mck-radio {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    border: .1rem solid #aaa;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: all .2s;
    margin-right: .4rem;
    &::after {
      opacity: 0;
      display: block;
      content: '';
      position: absolute;
      top: .2rem;
      left: .2rem;
      width: 0.4rem;
      height: 0.4rem;
      background-color: #aaa;
      border-radius: 50%;
    }
    &.active {
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>