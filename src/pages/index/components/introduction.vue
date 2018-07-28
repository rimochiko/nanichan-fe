<template>
  <div class="introduction-wrapper">
    <div class="item">
      <p class="main">记单词</p>
      <p class="des">简单区分的例子和分类，日语歌/日剧/日影的学习举例，而且你也可以参与其中的编辑，帮助别人，共同成长，让你更快掌握。</p>
    </div>
    <div class="item">
      <p class="main">每日练习</p>
      <p class="des">可以是日常的翻译，或者在线做日语等级考试/模拟日语考试的题目！大家都可以贡献自己的力量哦！</p>
    </div>
    <div class="item">
      <p class="main">学唱歌</p>
      <p class="des">温习自己熟悉的音乐，在音乐的陪伴下记单词，理解语法！是不是很酷呀！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Introduction'
}
</script>
<style  scoped lang="less">
.introduction-wrapper {
  font-size: 0;
  .item {
    display: inline-block;
    padding: 1%;
    width: 31.3%;
    .main {
      font-size: 1.8rem;
      font-weight: 300;
    }
    .des {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 300;
    }
  }
}
</style>