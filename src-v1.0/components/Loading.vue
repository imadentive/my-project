<template>
  <div id="loading">
    <div class='uil-spin-css' style='-webkit-transform:scale(0.25);margin:2rem auto;'>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../static/lib/spin.css';
export default {
  name: 'loading',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loading{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index: 1001;
}
</style>
