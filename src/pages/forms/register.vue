<template>
  <div class="register-body">
    <div class="register-form">
      <RegForm />
    </div>
    <bubble-tip text=""></bubble-tip>
  </div>
</template>
<script>
import Header from './components/header.vue'
import RegForm from './components/regform.vue'
import BubbleTip from './components/bubbletip.vue'
export default {
  name: 'Register',
  components: {
    Header,
    RegForm,
    BubbleTip
  }
}
</script>
<style  scoped lang="less">
.register-body {
  display: table;
  width: 100%;
  .register-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
}
</style>