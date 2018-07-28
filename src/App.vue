<template>
  <div id="app">
    <Header v-if="isShow"></Header>
    <router-view/>
    <Footer v-if="isShow"></Footer>
  </div>
</template>

<script>
import Header from './pages/forms/components/header.vue'
import Footer from './pages/index/components/footer.vue'
export default {
  name: 'App',
  components: {
  	Header,
    Footer
  },
  data () {
    return {
      isShow: true
    }
  },
  watch: {
    $route: "watchRoute"
  },
  methods: {
    watchRoute: function () {
      if(this.$route.path.match(/^\/remember/g)) {
        this.isShow = false
      } else if(this.$route.path.match(/^\/test/g)) {
        this.isShow = false
      } else if(this.$route.path.match(/^\/review/g)) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  mounted() {
    this.watchRoute()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
