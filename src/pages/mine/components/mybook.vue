<template>
  <div class="panel-wrapper">
    <h1 class="section-title">我创建的单词本</h1>
    <div class="option">
      <ul class="status">
        <li><button @click="createBook">创建单词本</button></li>
        <li>（共享单词本需消耗100个积分，受管理员审核）</li>
      </ul>
    </div>
    <div class="book-list" v-if="book.length">
      <div class="book-item" v-for="item in book" :key="item.id">
        <div class="book-cover">
          <img :src="item.cover">
        </div>
        <div class="book-info">
          <router-link :to="'/book/' + item.id + '/1'" class="title">{{item.title}}</router-link>
          <p class="des">所属类别：{{item.typeid}}</p>
          <p class="des">学习人数：{{item.studynum}}</p>
          <p class="des">是否共享：{{item.isShare? '是':'否'}}</p>
          <p class="des">所需积分：{{item.points}}</p>
        </div>
        <div class="book-option">
          <a href="#" class="button" v-if="!item.isShare" @click.prevent="updateBook(item.id)">修改信息</a>
          <a href="#" class="button" v-if="!item.isShare" @click.prevent="deleteBook(item.id)">删除词书</a>
          <a href="#" class="button" @click.prevent="addPlan(item.id)">添加计划</a>
        </div>
      </div>
    </div>
    <div class="book-none" v-else>
      <p>还没有创建过任何单词书</p>
    </div>
    <create-model />
    <update-model />
    <delete-model />
    <add-model />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import CreateModel from './models/bookCreator'
import UpdateModel from './models/updateBook'
import DeleteModel from './models/deleteBook'
import AddModel from '../../book/components/model'
export default {
  name: 'MyBook',
  data () {
    return {
      book: []
    }
  },
  components: {
    CreateModel,
    UpdateModel,
    DeleteModel,
    AddModel
  },
  created () {
    this.getBooks()
  },
  methods: {
    createBook: function () {
      this.$store.dispatch('switchBookCreatorShow', true)
    },
    updateBook: function (id) {
      this.$store.dispatch('switchUpdateBookShow', {
        status: true,
        id: id
      })
    },
    deleteBook: function (id) {
      this.$store.commit('switchDeleteBookShow', {
        status: true,
        id: id
      })
      console.log(1111)
    },
    getBooks: function () {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:3000/book/mybook/',
        data: {
          token: window.localStorage.getItem("token"),
          username: window.localStorage.getItem("username")
        }
      }).
      then((res) => {
        if(res.data != -1) {
          this.book = res.data
        } else {
          this.book = []
        }
      })
      .catch((res) => {
        this.$store.commit('clearUserAll')
        this.$store.commit('clearAllWord')
        this.$router.push({path: '/login'})
      })
    },
    addPlan: function (id) {
      this.$store.commit('switchPlanAddShow', {
        status: true,
        id: id
      })
    }
  },
  computed: {
    ...mapGetters([
      'isUpdateBookShow',
      'isDeleteBookShow'
    ])
  },
  watch: {
    isUpdateBookShow: function (newVal, oldVal) {
      if(oldVal == true && newVal == false) {
        this.getBooks()
      }
    },
    isDeleteBookShow: function (newVal, oldVal) {
      if(oldVal == true && newVal == false) {
        this.getBooks()
      }      
    }
  }
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.panel-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
  .book-list {
    padding: 1rem 2rem 0;
  }
  .book-item {
    padding-bottom: 2rem;
    .book-cover,
    .book-info,
    .book-option {
      display: table-cell;
      vertical-align: middle;
    }
    .book-cover {
      width: 10rem;
      height: 12rem;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%; 
        border-radius: .5rem;
      }
    }
    .book-info,
    .book-option {
      padding-left: 2rem;
    }
    .title {
      font-size: 1.4rem;
      font-weight: 400;
      color: @normalblue;
      margin-bottom: 1rem;
      display: inline-block;
    }
    .des {
      color: #999;
    }
    .book-info {
      width: 57%;
      padding-right: 2rem;
    }
    .book-option {
      width: 8rem;
      vertical-align: middle;
      .button {
        display: block;
        border: 1px solid #DDD;
        padding: .6rem 1.5rem;
        color: #666;
        text-align: center;
        background-color: #FFF;
        font-size: 1rem;
        border-radius: .5rem;
        margin-bottom: 1rem;
        transition: all .2s;
        &:hover {
          background-color: #FAFAFA;
        }
      }
    }
  }
  .book-none {
    font-size: 2rem;
    color: #DDD;
    text-align: center;
    padding: 4rem 0;
  }
  .option {
    padding: 1.5rem  2rem 2rem;
    color: #999;
    font-size: 0;
    li {
      display: inline-block;
      margin-right: 1rem;
      font-size: 1rem;
    }
    button {
      padding: .5rem 1rem;
      background-color: @normalblue;
      color: #FFF;
      border-radius: .5rem;
      border: none;
      transition: all .2s;
    }
  }
}
</style>