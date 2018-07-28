<template>
  <div class="welcome-wrapper">
    <h1>人生は決して後戻りできません。<br>進めるのは前だけです。</h1>
    <p>人生不可能后退，只能前进。 ​​​​</p>
  </div>
</template>
<script>
export default {
  name: 'Welcome',
}
</script>
<style  scoped lang="less">
@normalblue: #4FD2C2;
@deepblue: #41b5a7;
@normalpurple: #6562A7;
.welcome-wrapper {
  width: 92%;
  padding: 4%;
  text-align: left;
  background-image: linear-gradient(to right bottom, @normalblue, @normalpurple);
  border-radius: .5rem;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.15);
  color: #FFF;
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    line-height: 2;
    font-weight: 300;
  }
  p {
    margin: 0;
    line-height: 2;
    font-weight: 300;
    font-size: 1rem;
  }
}
</style>