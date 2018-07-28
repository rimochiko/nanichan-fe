import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/pages/forms/register.vue'
import Login from '@/pages/forms/login.vue'
import Book from '@/pages/book/book.vue'
import BookDetail from '@/pages/book/bookDetail.vue'
import User from '@/pages/mine/user.vue'
import Mine from '@/pages/mine/mine.vue'
import Search from '@/pages/search/search.vue'
import Index from '@/pages/index/index.vue'

import Remember from '@/pages/study/remember.vue'
import Test from '@/pages/study/test.vue'
import TestRes from '@/pages/study/testres.vue'
import Review from '@/pages/study/review.vue'
import ReviewRes from '@/pages/study/reviewres.vue'

import Plan from '@/pages/mine/components/plan.vue'
import SearchRes from '@/pages/search/searchres.vue'
import Task from '@/pages/mine/subpages/task.vue'
import Record from '@/pages/mine/components/record.vue'
import Numchart from '@/pages/mine/components/numchart.vue'
import Profile from '@/pages/mine/components/profile.vue'
import Word from '@/pages/mine/components/word.vue'
import MyBook from '@/pages/mine/components/mybook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    }, 
    { 
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/book/:id/:page',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/book/:id/',
      name: 'Book',
      component: Book
    },
    {
      path: '/book',
      name: 'BookFilter',
      component: Book
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/search/:way/:keyword',
      name: 'SearchRes',
      component: SearchRes
    },
    {
      path: '/search/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      children: [{
        path: '/mine/plan',
        name: 'Plan',
        component: Plan
      },
      {
        path: '/mine/record',
        name: 'Record',
        component: Record
      },
      {
        path: '/mine/word',
        name: 'Word',
        component: Word
      },
      {
        path: '/mine/chart',
        name: 'Numchart',
        component: Numchart
      },
      {
        path: '/mine/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/mine',
        name: 'Task',
        component: Task
      },      {
        path: '/mine/book',
        name: 'MyBook',
        component: MyBook
      }]
    },
    {
      path: '/remember',
      name: 'Remember',
      component: Remember
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/test/res',
      name: 'TestRes',
      component: TestRes
    },
    {
      path: '/review/',
      name: 'Review',
      component: Review
    },
    {
      path: '/review/res',
      name: 'ReviewRes',
      component: ReviewRes
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
