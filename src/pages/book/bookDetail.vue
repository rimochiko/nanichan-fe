<template>
  <div class="detail-wrapper">
    <Detail :data="detail"/>
    <div class="right-section">
      <Option :data="option"/>
    </div>
  </div>
</template>
<script>
import Detail from './components/detail'
import Option from './components/option'
export default {
  name: 'BookDetail',
  data () {
    return {
      detail: {
        book: {
          title: '加载中...',
          creator: '',
          des: ''
        },
        num: 0,
      },
      option: {
        avatar: [],
        studyNum: 0
      }
    }
  },
  components: {
    Detail,
    Option
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail: function () {
      let id = this.$route.params.id
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/book/bookdetail/',
        data: {
          id: id,
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username"),
        }
      })
      .then((res) => {
        if(res.data) {
          res.data.forEach((item, index) => {
            if(item.length == 1 && item[0].title) {
              this.$set(this.detail, 'book', item[0])
              this.$set(this.option, 'studyNum', item[0].studynum)
            } else if(item.length == 1 && item[0].num) {
              this.$set(this.detail, 'num', item[0].num);
            } else if(item.length >= 1 && item[0].username) {
              this.$set(this.option, 'avatar', item);
            }
          })
        }
      })
      .catch((err) => {
        this.$router.push({path: '/book'})
      })
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
.detail-wrapper {
  padding: 4rem 4rem 0;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
.right-section {
  float: right;
  width: 28%;
}
</style>