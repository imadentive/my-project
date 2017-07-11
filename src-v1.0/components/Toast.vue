<template>
  <div class="toast-box">
    <div class="com-toast">
      {{ tips}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props:{
     tips:{
       default: 'tips'
     }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
