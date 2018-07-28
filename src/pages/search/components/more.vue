<template>
  <div class="more-res">
    <a href="#">补充信息</a>
    <a href="#">纠错</a>
  </div>
</template>
<script>
export default {
  name: 'More',
  data () {
    return {
      result: []
    }
  }
}
</script>
<style  scoped lang="less">
.more-res {
  a {
    padding: .4rem 1rem;
    border: .1rem solid #CCC;
    border-radius: 1rem;
    color: #CCC;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}
</style>