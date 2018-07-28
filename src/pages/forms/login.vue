<template>
  <div class="register-body">
    <div class="register-form">
      <LoginForm />
    </div>
  </div>
</template>
<script>
import Header from './components/header.vue'
import LoginForm from './components/loginform.vue'
export default {
  name: 'Register',
  components: {
    Header,
    LoginForm
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