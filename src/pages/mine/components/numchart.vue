<template>
  <div class="chart">
    <div class="panel-wrapper">
      <h1 class="section-title">活跃度曲线</h1>
      <ve-line :data="pointsData" class="chart"></ve-line>
    </div>
    <div class="panel-wrapper">
      <h1 class="section-title">正确率曲线</h1>
      <ve-line :data="gradeData" class="chart"></ve-line>
    </div>   
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'Numchart',
  components: {
    VeLine
  },
  data: function () {
    return {
      pointsData: {
        columns: ['日期', '活跃积分'],
        rows: []
      },
      gradeData: {
        columns: ['日期', '正确率'],
        rows: []
      }
    }
  },
  created () {
    this.$ajax({
      method: 'post',
      url: 'http://localhost:3000/user/getData',
      data: {
        token: window.localStorage.getItem("token"),
        username: window.localStorage.getItem("username")
      }
    })
    .then((res) => {
      if(res.data != -1) {
        let p_row = [];
        let g_row = [];
        if(res.data.points) {
          (res.data.points).forEach((item, index) => {
            let obj = {
              '日期': item.dayDate,
              '活跃积分': item.points
            }
            p_row.push(obj)
          })
        }
        if(res.data.grade) {
          (res.data.grade).forEach((item, index) => {
            let obj = {
              '日期': item.createDate,
              '正确率': (1 - (item.wrong / item.count)).toFixed(2)
            }
            g_row.push(obj)
          })
        }
        this.$set(this.pointsData, 'rows', p_row)
        this.$set(this.gradeData, 'rows', g_row)
      }
    })
    .catch((res) => {
      this.$store.commit('clearUserAll')
      this.$store.commit('clearAllWord')
      this.$router.push({path: '/login'})
    })
  }
}
</script>
<style  scoped lang="less">
.panel-wrapper {
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  margin-bottom: 2rem;
}
</style>