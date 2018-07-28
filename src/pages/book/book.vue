<template>
  <div class="book-wrapper">
    <div class="left-section">  
      <div class="book-list">
        <Item v-for="content in books" :content="content" :key="content.key"/>
      </div>
    </div>
    <div class="right-section">
      <Type :data="types" title="分类筛选"/>
    </div>
    <Model/>
  </div>
</template>
<script>
import Item from './components/item.vue'
import Type from './components/type.vue'
import Model from './components/model.vue'
export default {
  name: 'Book',
  data () {
    return {
      books: [],
      types: []
    }
  },
  components: {
    Item,
    Type,
    Model,
  },
  created () {
    this.getTypes();
    this.getBooks();
  },
  methods: {
    getTypes: function () {
      this.$ajax({
        method: 'get',
        url: 'http://localhost:3000/book/types',
      }).then((res) => {
        if(res.data !== -1) {
          this.types = res.data
          this.types.forEach(function(item, key){
            item.href = '/book/' + key
          })
          this.types.unshift({
            id: -1,
            name: '全部分类',
            href: '/book/'
          })
        }
      })
    },
    getBooks: function () {
      let id = this.$route.params.id
      let url = id == null ? 'http://localhost:3000/book/book': 'http://localhost:3000/book/book/' + id
      this.$ajax({
        method: 'get',
        url: url,
      }).then((res) => {
        if(res.data !== -1) {
          this.books = res.data
        }
      })      
    }
  },
  watch: {
    $route: function () {
      this.getBooks()
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.book-wrapper {
  padding: 4rem 4rem 0;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .section-title {
    font-weight: 400;
    color: #999;
    font-size: 1.1rem;
    margin-top: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .left-section {
    float: left;
    width: 80%;
  }
  .right-section {
    float: right;
    width: 20%;
  }
  .book-list {
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>