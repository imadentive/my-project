<template>
  <div class="com-empty">
    <img src="../../static/images/icon-no-result.png" alt="">
    <div v-if='!other' class="text">暂无结果</div>
    <div v-else class="text">找不到任何与<span>“{{title}}”</span>匹配的内容</div>
  </div>
</template>

<script>
export default {
  name: 'empty',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    title: {
      type: String,
      default:'标题'
    },
    other: {
      type: Boolean,
      default:false
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
