<template>
  <div class="task-wrapper">
    <TodayTask />
    <ReviewTask />
  </div>
</template>
<script>
import TodayTask from './components/todayTask'
import ReviewTask from './components/reviewTask'
import { mapGetters } from 'vuex';
export default {
  name: 'Task',
  computed: {
    ...mapGetters([
      'words',
      'studyIndex',
    ])
  },
  components: {
    TodayTask,
    ReviewTask
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
  .section-title {
    padding: .7rem 1rem;
    color: #777;
    background-color: #F8F8F8;
    font-size: 1rem;
    font-weight: normal;
  }
  .task-box {
    padding: 0 2rem 2rem;
    .task-plan {
      display: table-cell;
      text-align: center;
      padding-right: 1rem;
      .main {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
      .plan-btn {
        font-size: .9rem;
        color: #999;
        > span {
          margin-right: .3rem;
        }
      }
    }
    .task-detail {
      float: left;
      .task-data {
        padding-left: 2rem;
        display: table-cell;
        .num {
          font-size: 2rem;
          text-align: center;
          margin: 2rem 0 1rem;
        }
        .des {
          color: #999;
          margin: 0;
        }
      }
    }
    .task-opt {
      float: right;
      .task-btn {
        color: #FFF;
        border-radius: 1rem;
        padding: .5rem 1.4rem;
        display: block;
        margin-top: 1rem;
        font-size: 1.2rem;
        &.blue {
          background-color: @normalblue;
        }
        &.purple {
          background-color: @normalpurple;
        }
      }
    }
    &::after {
      display: block;
      clear: both;
      content: '';
    }
  }
}
</style>